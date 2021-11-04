import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../category/category.entity";
import {Shop} from "../shop/shop.entity";
import {SpecValues} from "../spec/spec-values.entity";

export enum ProductTypes {
    PRODUCT="PRODUCT",

}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToOne(()=>Category,category=>category.products)
    @JoinColumn({name:'categoryId'})
    category:number;

    @Column()
    smallDesc:string

    @Column({type:"text"})
    fullDesc:string


    @Column()
    price:number;

    @ManyToOne(()=>Shop,shop=>shop.products)
    shop:Shop;

    @ManyToMany(()=>SpecValues,product=>product.products)
    specs:SpecValues[]

}