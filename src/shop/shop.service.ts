import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Shop} from "./shop.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateShopDto} from "./dto/create-shop.dto";
import {UserService} from "../user/user.service";
import {AddUserToShopDto} from "./dto/add-user-to-shop.dto";
import {CreateProductDto} from "../product/dto/create-product.dto";
import {ProductService} from "../product/product.service";
import {SpecService} from "../spec/spec.service";
import {AddProductToShopDto} from "./dto/add-product-to-shop.dto";
import {ShopAddress} from "./addressShop.entity";
import {AddAddressToShopDto} from "./dto/add-address-to-shop.dto";
import {DeleteAddressInShopDto} from "./dto/delete-address-in-shop.dto";

@Injectable()
export class ShopService {
    constructor(@InjectRepository(Shop) private shopRepository: Repository<Shop>,
                private userService: UserService, private productService: ProductService,
                private specService: SpecService, @InjectRepository(ShopAddress) private shopAddressRepository: Repository<ShopAddress>
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
        console.log(await this.shopRepository.find({relations:["admin_users"]}))
        return user.shops
    }

    async addUserForShop(dto: AddUserToShopDto): Promise<Shop> {
        const {shop, user} = await this.workWithAddUserAndDelete(dto)
        await this.userService.addRoleForUser({email: dto.email, role: "SELLER"})
        if (user.shops.some(shopItem => shopItem.name == shop.name)) {
            throw new HttpException("этот пользователь уже тарговец этого магазина", HttpStatus.BAD_REQUEST)
        }
        user.shops = [...user.shops, shop]

        await this.userService.save(user)
        return shop
    }

    private async deleteUserInShop(dto: AddUserToShopDto): Promise<Shop> {
        const {shop, user} = await this.workWithAddUserAndDelete(dto)
        if (!user.shops.some(shopItem => shopItem.name == shop.name)) {
            throw new HttpException("этот пользователь не торговец в этом магазигне", HttpStatus.BAD_REQUEST)
        }
        user.shops = user.shops.filter(item => item !== shop)
        if (!user.shops.length) {
            await this.userService.deleteRole({email: user.email, role: "SELLER"})
        }
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

    async getShop(id: number): Promise<Shop> {
        return await this.shopRepository.findOne({
            where: {id},
            relations: ['admin_users', 'products', 'owner', 'addresses']
        })
    }

    async getMyShops(ownerId: number): Promise<Shop[]> {
        return await this.shopRepository.find({where: {ownerId}})
    }

    async createProduct(dto: AddProductToShopDto, email) {
        const shop = await this.shopRepository.findOne({where: {id: dto.product.shopId}, relations: ["admin_users"]})
        console.log(shop)
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException('у вас нет прав добовлять товар для этого магазина', HttpStatus.FORBIDDEN)
        }
        const product = await this.productService.createProduct(dto.product)
        for (let i = 0; i < dto.specs.length; i++) {
            await this.specService.addSpecToProduct({productId: product.id, specValueId: dto.specs[i]})
        }
        return product
    }

    async deleteProduct(id: number, email: string): Promise<{}> {
        const product = await this.productService.getProductById(id)
        const shop = await this.shopRepository.findOne({where: {id: product.shop.id}, relations: ["admin_users"]})
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException("у вас нет прав удалять товар для этого магазина", HttpStatus.FORBIDDEN)
        }
        return await this.productService.deleteProduct(id)
    }

    async addAddressToShop(dto: AddAddressToShopDto, email: string) {
        const shop = await this.checkShop(dto.shopId)
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException("у вас нет прав для этого запроса", HttpStatus.BAD_REQUEST)
        }
        await this.shopAddressRepository.save({shopAddress: shop, ...dto})
    }

    async removeAddress(dto: DeleteAddressInShopDto, email: string) {
        const shop = await this.checkShop(dto.shopId)
        if (!shop.admin_users.some(seller => seller.email == email)) {
            throw new HttpException("у вас нет прав для этого запроса", HttpStatus.BAD_REQUEST)
        }
        return await this.shopAddressRepository.delete({id: dto.shopId})
    }

    private async checkShop(id: number): Promise<Shop> {
        const shop = await this.shopRepository.findOne({where: {id}})
        if (!shop) {
            throw new HttpException("такого магазина нету", HttpStatus.BAD_REQUEST)
        }
        return shop
    }

}
