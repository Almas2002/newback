import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {RegisterUserDto} from "./dto/register-user.dto";
import {RoleService} from "../role/role.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {ProductService} from "../product/product.service";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private roleService: RoleService, private productService: ProductService) {
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
        const users = await this.userRepository.find({relations: ['roles']})
        for (let user of users) {
            delete user.password
        }
        return users
    }

    async getUserWithEmail(email: string,relationList?:string[]): Promise<User> {
        if(relationList){
            return await this.userRepository.findOne({email}, {relations: [relationList.join(',')]})
        }
        return await this.userRepository.findOne({email}, {relations: ['roles', 'shops', 'shops.products']})
    }

    async addRoleForUser(dto: AddRoleDto): Promise<User> {
        const user = await this.getUserWithEmail(dto.email)
        const role = await this.roleService.getRoleByValue(dto.role)
        if (!user || !role) {
            throw new HttpException("не найден пользователь или роль", HttpStatus.BAD_REQUEST)
        }

        if (user.roles.some(userRole => userRole.value == role.value)) {
            return

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
        if (!user.roles.some(userRole => userRole.value == role.value)) {
            throw new HttpException("такого роля нету у пользователя", HttpStatus.BAD_REQUEST)
        }
        const roles = user.roles.filter(e => e.value !== role.value)
        user.roles = [...roles]
        await this.userRepository.save(user)
        delete user.password
        return user
    }

    async activationAccount(activationLink: string) {
        const user = await this.userRepository.findOne({where: {activationLink}});
        if (!user) {
            throw new HttpException("нет существует такой ссылки", HttpStatus.BAD_REQUEST)
        }
        user.activated = true;
        await this.userRepository.save(user)
    }

    async save(user: User) {
        await this.userRepository.save(user)
    }

    async addFavoriteProduct(email: string, productId: number) {
        const {product, user} = await this.workWithFavorite(email, productId)
        user.favorites = [...user.favorites, product]
        await this.save(user)
        return user
    }

    async deleteFavoriteProduct(email: string, productId: number) {
        const {product, user} = await this.workWithFavorite(email, productId)
        user.favorites = user.favorites.filter(item => item.id !== product.id);
        await this.save(user)
        return user
    }

    private async workWithFavorite(email: string, productId: number) {
        const user = await this.getUserWithEmail(email,["favorites"])
        const product = await this.productService.getProductById(productId, ["users"])
        if (!user || !product) {
            throw new HttpException("пользователь или продукт не найден", HttpStatus.BAD_REQUEST)
        }
        return {user, product}
    }
}
