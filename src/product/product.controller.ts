import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService) {}

    @Post()
    createProduct(@Body()dto:CreateProductDto){
        return this.productService.createProduct(dto)
    }

    @Get()
    getProducts(){
        return this.productService.getProducts()
    }

    @Get(':id')
    getProductsById(@Param('id')id:number){
        return this.productService.getProductsById(id)
    }
}
