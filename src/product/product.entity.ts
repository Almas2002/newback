import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../category/category.entity";
import {Shop} from "../shop/shop.entity";
import {SpecValues} from "../spec/spec-values.entity";
import {OrderProducts} from "../order/order-products.entity";

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
    category:Category;

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

    @OneToMany(()=>OrderProducts,order=>order.product)
    orderProducts:OrderProducts[]

}