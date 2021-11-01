import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {RegisterUserDto} from "./dto/register-user.dto";
import {RoleService} from "../role/role.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private roleService: RoleService) {
    }

    async createUser(dto: RegisterUserDto): Promise<User> {
        const user = await this.userRepository.save(dto)
        const role = await this.roleService.getRoleByValue("USER")
        if (!role) {
            throw new HttpException("У нас нету роля пользователя", HttpStatus.BAD_REQUEST)
        }
        user.roles = [role]
        await this.userRepository.save(user);
        delete user.password
        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find({relations:['roles']})
        for(let user of users){
            delete user.password
        }
        return users
    }

    async getUserWithEmail(email: string):Promise<User>{
        return await this.userRepository.findOne({email},{relations: ['roles']})
    }

    async addRoleForUser(dto: AddRoleDto): Promise<User> {
        const user = await this.getUserWithEmail(dto.email)
        const role = await this.roleService.getRoleByValue(dto.role)
        if (!user || !role) {
            throw new HttpException("не найден пользователь или роль", HttpStatus.BAD_REQUEST)
        }

        if(user.roles.some(userRole=>userRole.value == role.value)){
            throw new HttpException("такой роль есть у пользователя",HttpStatus.BAD_REQUEST)

        }
        user.roles = [...user.roles, role]
        await this.userRepository.save(user)
        delete user.password
        return user
    }

    async deleteRole(dto: AddRoleDto): Promise<User> {
        const user = await this.getUserWithEmail(dto.email)
        const role = await this.roleService.getRoleByValue(dto.role)
        if (!user || !role) {
            throw new HttpException("не найден пользователь или роль", HttpStatus.BAD_REQUEST)
        }
        if(!user.roles.some(userRole=>userRole.value == role.value)){
            throw new HttpException("такого роля нету у пользователя",HttpStatus.BAD_REQUEST)
        }
        const roles = user.roles.filter(e => e.value !== role.value)
        user.roles = [...roles]
        await this.userRepository.save(user)
        delete user.password
        return user
    }
    async activationAccount(activationLink:string){
        const user = await this.userRepository.findOne({where: {activationLink}});
        if(!user){
            throw new HttpException("нет существует такой ссылки",HttpStatus.BAD_REQUEST)
        }
        user.activated = true;
        await this.userRepository.save(user)
    }
}
