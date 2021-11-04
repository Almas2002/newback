import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Shop} from "./shop.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateShopDto} from "./dto/create-shop.dto";
import {UserService} from "../user/user.service";
import {AddUserToShopDto} from "./dto/add-user-to-shop.dto";
import {CreateProductDto} from "../product/dto/create-product.dto";
import {ProductService} from "../product/product.service";
import {Product} from "../product/product.entity";

@Injectable()
export class ShopService {
    constructor(@InjectRepository(Shop) private shopRepository: Repository<Shop>,
                private userService: UserService, private productService: ProductService
    ) {
    }

    async createShop(dto: CreateShopDto): Promise<Shop> {
        const user = await this.userService.getUserWithEmail(dto.email)
        if (!user) {
            throw new HttpException("пользователь не найден", HttpStatus.BAD_REQUEST)
        }
        await this.userService.addRoleForUser({role: "SELLER", email: user.email,})
        const shop = await this.shopRepository.save({...dto, owner: {id: user.id}})
        user.shops = [...user.shops, shop]
        await this.userService.save(user)
        await this.shopRepository.save(shop)
        return shop;
    }

    async getShops(email: string): Promise<Shop[]> {
        const user = await this.userService.getUserWithEmail(email)
        if (!user) {
            throw new HttpException("пользователь не найден", HttpStatus.BAD_REQUEST)
        }
        return user.shops
    }

    async addUserForShop(dto: AddUserToShopDto):Promise<Shop> {
        const {shop, user} = await this.workWithAddUserAndDelete(dto)
        await this.userService.addRoleForUser({email: dto.email, role: "SELLER"})
        if (user.shops.some(shopItem => shopItem.name == shop.name)) {
            throw new HttpException("этот пользователь уже тарговец этого магазина", HttpStatus.BAD_REQUEST)
        }
        user.shops = [...user.shops, shop]

        await this.userService.save(user)
        return shop
    }

    private async deleteUserInShop(dto: AddUserToShopDto):Promise<Shop>{
        const {shop, user} = await this.workWithAddUserAndDelete(dto)
        if (!user.shops.some(shopItem => shopItem.name == shop.name)) {
            throw new HttpException("этот пользователь не торговец в этом магазигне", HttpStatus.BAD_REQUEST)
        }
        user.shops = user.shops.filter(item => item !== shop)
        await this.userService.save(user)
        return shop

    }

    private async workWithAddUserAndDelete(dto: AddUserToShopDto) {
        const user = await this.userService.getUserWithEmail(dto.email)
        const shop = await this.shopRepository.findOne({where: {id: dto.shopId}, relations: ['admin_users', 'owner']})

        if (!user || !shop) {
            throw new HttpException("пользователь или магазин не найдены", HttpStatus.BAD_REQUEST)
        }
        if (dto.ownerEmail !== shop.owner.email) {
            throw new HttpException("У вас нет достута", HttpStatus.FORBIDDEN)
        }
        return {
            user,
            shop
        }
    }

    async getShop(id: number):Promise<Shop>{
        return await this.shopRepository.findOne({where: {id}, relations: ['admin_users', 'products', 'owner']})
    }

    async getMyShops(ownerId: number):Promise<Shop[]> {
        return await this.shopRepository.find({where: {ownerId}})
    }

    async createProduct(dto: CreateProductDto, email):Promise<Product>{
        const shop = await this.shopRepository.findOne({where: {id: dto.shopId}, relations: ["admin_users"]})
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException('у вас нет прав добовлять товар для этого магазина', HttpStatus.FORBIDDEN)
        }
        return await this.productService.createProduct(dto)
    }

    async deleteProduct(id: number, email: string):Promise<{}>{
        const product = await this.productService.getProductById(id)
        const shop = await this.shopRepository.findOne({where: {id: product.shop.id}, relations: ["admin_users"]})
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException("у вас нет прав удалять товар для этого магазина", HttpStatus.FORBIDDEN)
        }
        return await this.productService.deleteProduct(id)
    }

}
