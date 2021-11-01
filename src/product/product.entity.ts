import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../category/category.entity";
import {Shop} from "../shop/shop.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToOne(()=>Category,category=>category.products)
    @JoinColumn({name:'categoryId'})
    category:number;

    @ManyToOne(()=>Shop,shop=>shop.products)
    shopId:number;

}