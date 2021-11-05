import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderShop} from "./order-shop.entity";

@Entity('order')
export class Order {
     @PrimaryGeneratedColumn()
     id:number;
     @Column()
     address:string;
     @Column()
     city:string;
     @OneToMany(()=>OrderShop,order=>order.order)
     shopOrders:OrderShop[]
}
