import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Repository} from "typeorm";
import {CreateProductDto} from "./dto/create-product.dto";
import {Category} from "../category/category.entity";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>,
                @InjectRepository(Category) private categoryRepository:Repository<Category>,) {}

    async createProduct(dto:CreateProductDto){
        return await  this.productRepository.save({...dto,category:dto.categoryId})
    }
    async getProducts(){
        return await this.productRepository.find()
    }
    async getProductsById(categoryId:number){
        return await this.productRepository.find({where:{category:categoryId},relations:["category"]});
    }
}
