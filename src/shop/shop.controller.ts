import {Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";
import {AddUserToShopDto} from "./dto/add-user-to-shop.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {CreateProductDto} from "../product/dto/create-product.dto";

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService) {}
    @UseGuards(AuthGuard)
    @Post()
    createShop(@Body()dto:CreateShopDto,@Req() req){
        return this.shopService.createShop({...dto,email:req.user.email})
    }
    @UseGuards(AuthGuard)
    @Get()
    getShops(@Req() req){
        console.log(req.user)
        return this.shopService.getShops(req.user.email)
    }
    @UseGuards(AuthGuard)
    @Post('add-seller')
    addSeller(@Body()dto:AddUserToShopDto,@Req() req){
        return this.shopService.addUserForShop({...dto,ownerEmail:req.user.email})
    }

    @Get(':id')
    getShop(@Param('id')id:number){
        return this.shopService.getShop(id)
    }
    @UseGuards(AuthGuard)
    @Post('product')
    createProduct(@Body()dto:CreateProductDto,@Req() req){
        return this.shopService.createProduct(dto,req.user.email)
    }
    @UseGuards(AuthGuard)
    @Delete('product/:id')
    deleteProduct(@Param('id')id:number,@Req() req){
        return this.shopService.deleteProduct(id,req.user.email)
    }
    @UseGuards(AuthGuard)
    @Get("my")
    getMyShops(@Req()req){
        return this.shopService.getMyShops(req.user.id)
    }





}
