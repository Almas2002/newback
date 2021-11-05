import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";
import {AddUserToShopDto} from "./dto/add-user-to-shop.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {Role} from "../auth/user-roles.decorator";
import {RoleGuards} from "../auth/guards/role.guards";
import {AddProductToShopDto} from "./dto/add-product-to-shop.dto";
import {AddAddressToShopDto} from "./dto/add-address-to-shop.dto";
import {DeleteAddressInShopDto} from "./dto/delete-address-in-shop.dto";

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService) {}
    @UseGuards(AuthGuard)
    @Post()
    createShop(@Body()dto:CreateShopDto,@Req() req){
        return this.shopService.createShop({...dto,email:req.user.email})
    }
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Get()
    getShops(@Req() req){
        console.log(req.user)
        return this.shopService.getShops(req.user.email)
    }
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('add-seller')
    addSeller(@Body()dto:AddUserToShopDto,@Req() req){
        return this.shopService.addUserForShop({...dto,ownerEmail:req.user.email})
    }
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Get("my")
    getMyShops(@Req()req){
        return this.shopService.getMyShops(req.user.id)
    }

    @Get('/:id')
    getShop(@Param('id')id:number){
        return this.shopService.getShop(id)
    }
    @Post('add-address')
    addAddress(@Body()dto:AddAddressToShopDto,@Req() req){
        return this.shopService.addAddressToShop(dto,req.user.email)
    }
    @Role('SELLER')
    @UseGuards(RoleGuards)
    @Post('remove-address')
    removeAddress(@Body()dto:DeleteAddressInShopDto,@Req() req){
        return this.shopService.removeAddress(dto,req.user.email)
    }
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('product')
    createProduct(@Body()dto:AddProductToShopDto,@Req() req){
        return this.shopService.createProduct(dto,req.user.email)
    }
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Delete('product/:id')
    deleteProduct(@Param('id')id:number,@Req() req){
        return this.shopService.deleteProduct(id,req.user.email)
    }







}
