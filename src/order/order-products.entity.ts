import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../product/product.entity";
import {OrderShop, StatusOfOrder} from "./order-shop.entity";

@Entity('order_products')
export class OrderProducts {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Product,product=>product.orderProducts)
    product:Product;

    @Column()
    qty:number;
    @Column({
        type:"enum",
        enum:StatusOfOrder,
        default:StatusOfOrder.CREATED
    })
    status:StatusOfOrder
    @ManyToOne(()=>OrderShop,order=>order.products)
    orderShop:number;
}