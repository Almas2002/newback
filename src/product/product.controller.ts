import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {IQueryParamProducts} from "./interfaces";
import {FileInterceptor} from "@nestjs/platform-express";
import {UserDecorator} from "../user/decorator/User.decorator";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./product.entity";
@ApiTags("Продукты")
@Controller('product')
export class ProductController {
    constructor(private productService:ProductService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createProduct(@Body()dto:CreateProductDto,@UploadedFile()file){
        return this.productService.createProduct(dto,file)
    }
    @ApiOperation({summary:"Получить все товары"})
    @ApiResponse({status:200,type:[Product]})
    @ApiQuery({name:"limit",type:"int"})
    @ApiQuery({name:"offset",type:"int"})
    @ApiQuery({name:"categoryId",type:"int",required:false})
    @ApiQuery({name:"shopId",type:"int",required:false})
    @Get()
    getProducts(@Query() query:IQueryParamProducts){
        return this.productService.getProducts(query)
    }

    @Get(':categoryId')
    getProductsById(@Param('categoryId')id:number){
        return this.productService.getProductById(id)
    }
    @Get('favorite-count/:productId')
    getProductFavoritesCount(@Param('productId')id:number,@UserDecorator('email')email:string){
        return this.productService.getFavoritesCount(email,id)
    }
    @Get('get-one/:productId')
    getOneProduct(@Param('productId')id:number){
        return this.productService.getOneProduct(id)
    }

}
