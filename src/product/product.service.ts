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
        return await  this.productRepository.save({...dto,shop:{id:dto.shopId},category:{id:dto.categoryId}})
    }
    async getProducts(){
        return await this.productRepository.find()
    }
    async getProductsById(categoryId:number){
        return await this.productRepository.find({where:{category:categoryId},relations:["category","specs","shop"]});
    }
    async getProductById(id:number):Promise<Product>{
        return await this.productRepository.findOne({where:{id},relations:["category","specs","shop","specs.title"]})
    }
    async deleteProduct(id:number){
        return await this.productRepository.delete({id})
    }
}
