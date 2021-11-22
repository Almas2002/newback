import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {getRepository, Repository} from "typeorm";
import {CreateProductDto} from "./dto/create-product.dto";
import {Category} from "../category/category.entity";
import {IFindAllProduct, IQueryParamProducts} from "./interfaces";
import {FileService} from "../file/file.service";
import {FeedbackService} from "../feedback/feedback.service";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>,
                @InjectRepository(Category) private categoryRepository:Repository<Category>,
                private fileService:FileService,private feedbackService:FeedbackService
                ) {}

    async createProduct(dto:CreateProductDto,file:any){
        const fileName = await this.fileService.uploadFile(file)
        return await  this.productRepository.save({...dto,shop:{id:dto.shopId},category:{id:dto.categoryId},image:fileName})
    }
    async getProducts(query:IQueryParamProducts):Promise<IFindAllProduct>{
        const queryBuilder = getRepository(Product)
            .createQueryBuilder('products')
            .leftJoinAndSelect('products.category','categories')
            .leftJoinAndSelect('products.shop','shop');
        queryBuilder.orderBy('products.id','DESC')

        if(query.limit){
            queryBuilder.limit(query.limit)
        }
        if(query.offset){
            queryBuilder.offset(query.offset)
        }
        if(query.categoryId){
            queryBuilder.andWhere('products.categoryId = :id',{id:query.categoryId})
        }
        if(query.shopId){
            queryBuilder.andWhere('products.shopId = :id',{id:query.shopId})
        }

        const products = await queryBuilder.getMany()
        const count = await queryBuilder.getCount()
        return {products,count}
    }
    async getProductsById(categoryId:number){
        return await this.productRepository.find({where:{category:categoryId},relations:["category","specs","shop"]});
    }
    async getOneProduct(id:number){
        const product = await this.getProductById(id)
        const avg = await this.feedbackService.getAVG(id)
        return {product,avg}

    }
    async getProductById(id:number,relationList?:string[]):Promise<Product>{
        if(relationList){
            return await this.productRepository.findOne({where:{id},relations:["category","shop",relationList.join(',')]})
        }
        return await this.productRepository.findOne({where:{id},relations:["category","specs","shop","specs.title"]})
    }
    async deleteProduct(id:number){
        const product = await this.getProductById(id)
        await this.fileService.deleteFile(product.image)
        return await this.productRepository.delete({id})
    }
    async getFavoritesCount(email: string, productId: number) {
        const product = await this.getProductById(productId,["favorites"])
        const count = product.users.length
        if (!product.users.some(userRole => userRole.email == email)) {
            return {count, click: false}
        }
        return {count, click: true}
    }

}
