import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {RegisterUserDto} from "../user/dto/register-user.dto";
import * as bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import {User} from "../user/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Token} from "./token.entity";
import {Repository} from "typeorm";
import MailerService from "../mailer/mailer.service";
import {Role} from "../role/role.entity";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,
                @InjectRepository(Token) private tokenRepository: Repository<Token>,) {}

    private  generationToken(user: User) {
        const payload = {id: user.id, email: user.email, roles: user.roles}
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {secret: "refresh", expiresIn: "30d"})
        }
    }

    async login(dto: LoginUserDto,res) {
        const user = await this.validation(dto)
        const tokens = await this.generationToken(user)
        res.cookie('refreshToken',tokens.refresh_token,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        delete user.password
        return {
            ...tokens,
            user
        }

    }

    async registration(dto: RegisterUserDto,res) {
        const candidate = await this.userService.getUserWithEmail(dto.email)
        if (candidate) {
            throw new HttpException("такой email уже у нас есть", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const activationLink = uuid.v4()

        const user = await this.userService.createUser({...dto, password: hashPassword, activationLink})
        const tokens = await this.generationToken(user)
        res.cookie('refreshToken',tokens.refresh_token,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        try {
            await MailerService.sendActivationMail(`http://localhost:3000/activation/${user.activationLink}`,user.email)
        }catch (e) {
            throw new HttpException("такого почты нету",HttpStatus.BAD_REQUEST)
        }
        await this.saveToken(user.id, tokens.refresh_token)

        delete user.password

        return {
            ...tokens,
            user
        }
    }

    private async saveToken(userId: number, refresh_token: string) {
        const candidate = await this.tokenRepository.findOne({where: {userId}})
        console.log(candidate)
        if (candidate) {

            return await this.tokenRepository.update({id: candidate.id}, {refresh_token})
        }
        return await this.tokenRepository.save({refresh_token, userId})
    }

    private async validation(dto: LoginUserDto): Promise<User> {
        const user = await this.userService.getUserWithEmail(dto.email)
        const campfirePassword = await bcrypt.compare(dto.password, user.password)
        if (!user || !campfirePassword) {
            throw new HttpException("Некорректный пороль или емейл", HttpStatus.BAD_REQUEST)
        }
        return user
    }
    private async findRefreshToken(refresh_token:string){
        return await this.tokenRepository.findOne({where:{refresh_token}})
    }
    private verifyRefreshToken(refresh_token:string):{id:number,email:string,roles:Role[]}{
        return this.jwtService.verify(refresh_token,{secret:"refresh"})
    }
    async refresh(refresh_token,res){
        if(!refresh_token){
            throw new UnauthorizedException({message:"вы не загерестрированы"})
        }
        const verifyToken = this.verifyRefreshToken(refresh_token)
        const refreshTokenFromDB = this.findRefreshToken(refresh_token)
        if(!verifyToken || !refreshTokenFromDB){
            throw new UnauthorizedException({message:"вы не загерестрированы"})
        }
        const user = await this.userService.getUserWithEmail(verifyToken.email)
        const tokens =  this.generationToken(user)
        await this.saveToken(user.id,tokens.refresh_token)
        res.cookie('refreshToken',tokens.refresh_token,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return {...tokens,user}
    }
    async logout(refresh_token:string){
        return await this.tokenRepository.delete({refresh_token})
    }

}
