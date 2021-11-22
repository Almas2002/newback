import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderShop} from "./order-shop.entity";
import {User} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('order')
export class Order {
     @PrimaryGeneratedColumn()
     id:number;
     @ApiProperty({example:"Толеби Сейфулина",description:"адрес заказщика"})
     @Column()
     address:string;
     @ApiProperty({example:"Алматы",description:"город заказщика"})
     @Column()
     city:string;

     @Column({default:0})
     totalPrice:number;
     @ApiProperty({example:"87075545401",description:"телефон номер заказщика"})
     @Column()
     phone:string
     @ApiProperty({example:"yyyy-mm-dd (2021-11-22)",description:"заказать на этот день (выходные дни не работают)"})
     @Column()
     date:string;

     @OneToMany(()=>OrderShop,order=>order.order)
     shopOrders:OrderShop[]

     @ManyToOne(()=>User,user=>user.orders,{nullable:false})
     customer:User
}
