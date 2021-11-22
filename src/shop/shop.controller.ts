import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";
import {AddUserToShopDto} from "./dto/add-user-to-shop.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {Role} from "../auth/user-roles.decorator";
import {RoleGuards} from "../auth/guards/role.guards";
import {AddProductToShopDto} from "./dto/add-product-to-shop.dto";
import {AddAddressToShopDto} from "./dto/add-address-to-shop.dto";
import {DeleteAddressInShopDto} from "./dto/delete-address-in-shop.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UserDecorator} from "../user/decorator/User.decorator";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Spec} from "../spec/spec.entity";
import {Shop} from "./shop.entity";
import {Product} from "../product/product.entity";
import {ShopAddress} from "./addressShop.entity";

@ApiTags("Магазин")
@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) {
    }

    @ApiOperation({summary: "создать магазин",})
    @ApiResponse({status: 201, type: Shop})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    createShop(@Body()dto: CreateShopDto, @UserDecorator('email')email: string, @UploadedFile()file: any) {
        return this.shopService.createShop({...dto}, file, email)
    }

    @ApiOperation({summary: "получить магазинов",})
    @ApiResponse({status: 200, type: [Shop]})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Get()
    getShops(@UserDecorator('email') email: string) {
        return this.shopService.getShops(email)
    }

    @ApiOperation({summary: "добавить продовца для магазина",})
    @ApiResponse({status: 200, type: Shop})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('add-seller')
    addSeller(@Body()dto: AddUserToShopDto, @UserDecorator('email') email:string) {
        return this.shopService.addUserForShop({...dto, ownerEmail: email})
    }
    @ApiOperation({summary: "удалить продовца в магазине",})
    @ApiResponse({status: 200, type: Shop})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('add-seller')
    removeSeller(@Body()dto: AddUserToShopDto, @UserDecorator('email') email:string) {
        return this.shopService.deleteUserInShop({...dto, ownerEmail: email})
    }

    @ApiOperation({summary: "получить созданное магазины автора",})
    @ApiResponse({status: 200, type: Shop})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Get("my")
    getMyShops(@UserDecorator('id')id: number) {
        return this.shopService.getMyShops(id)
    }

    @ApiOperation({summary: "получить магазин по id",})
    @ApiResponse({status: 200, type: Shop})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Get('/:id')
    getShop(@Param('id')id: number) {
        return this.shopService.getShop(id)
    }

    @ApiOperation({summary: "добавить адрес для магазина",})
    @ApiResponse({status: 200, type: ShopAddress})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('add-address')
    addAddress(@Body()dto: AddAddressToShopDto, @UserDecorator('email')email: string) {
        return this.shopService.addAddressToShop(dto, email)
    }

    @ApiOperation({summary: "удалить адрес для магазина",})
    @ApiResponse({status: 200, type: ShopAddress})
    @ApiBearerAuth()
    @Role('SELLER')
    @UseGuards(RoleGuards)
    @Post('remove-address')
    removeAddress(@Body()dto: DeleteAddressInShopDto, @Req() req) {
        return this.shopService.removeAddress(dto, req.user.email)
    }

    @ApiOperation({summary: "добавить товар для магазина",})
    @ApiResponse({status: 201, type: Product})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post('product')
    @UseInterceptors(FileInterceptor('file'))
    createProduct(@Body()dto: AddProductToShopDto, @UserDecorator('email')email: string, @UploadedFile()file) {
        return this.shopService.createProduct(dto, email, file)
    }

    @ApiOperation({summary: "удалить товар в магазине",})
    @ApiResponse({status: 201, type: Product})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Delete('product/:id')
    deleteProduct(@Param('id')id: number, @Req() req) {
        return this.shopService.deleteProduct(id, req.user.email)
    }

    @ApiOperation({summary: "заказать доставку",})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Role("SELLER")
    @UseGuards(RoleGuards)
    @Post("create-delivery/:id")
    createDelivery(@Param('id')id: number) {
        return this.shopService.startDelivering(id)
    }


}
