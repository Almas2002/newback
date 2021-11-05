import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../product/product.entity";
import {OrderShop} from "./order-shop.entity";

@Entity('order_products')
export class OrderProducts {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Product,product=>product.orderProducts)
    product:number;

    @Column()
    qty:number;

    @ManyToOne(()=>OrderShop,order=>order.products)
    orderShop:number;
}