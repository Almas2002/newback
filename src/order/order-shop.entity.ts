import {Shop} from "../shop/shop.entity";
import {Order} from "./order.entity";
import {OrderProducts} from "./order-products.entity";
import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
@Entity('order_shop')
export class OrderShop {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Shop,shop=>shop.orders)
    shop:number;
    @ManyToOne(()=>Order,order=>order.shopOrders)
    order:number;
    @OneToMany(()=>OrderProducts,order=>order.orderShop)
    products:OrderProducts[]
}