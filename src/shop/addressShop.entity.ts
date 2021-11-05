import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "./shop.entity";

@Entity('shop-address')
export class ShopAddress {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    street:string;
    @Column()
    city:string;
    @Column()
    zipCode:string;
    @ManyToOne(()=>Shop,shop=>shop.addresses)
    shopAddress:Shop
}