import {Shop} from "../shop/shop.entity";
import {Order} from "./order.entity";
import {OrderProducts} from "./order-products.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

export enum StatusOfOrder {
    CREATED="CREATED",
    PAYMENT="PAYMENT",
    READYFORDELIVERY="READYFORDELIVERY",
    DELIVERY="DELIVERY",
    SUCCESS = "SUCCESS"
}


@Entity('order_shop')
export class OrderShop {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Shop,shop=>shop.orders)
    shop:Shop;
    @ManyToOne(()=>Order,order=>order.shopOrders)
    order:Order;
    @Column({default:0})
    totalPrice:number;
    @Column({
        type:"enum",
        enum:StatusOfOrder,
        default:StatusOfOrder.CREATED
    })
    status:StatusOfOrder
    @Column({nullable:true})
    orderNo:string
    @Column({nullable:true})
    cardsId:string;
    @OneToMany(()=>OrderProducts,order=>order.orderShop)
    products:OrderProducts[]
}