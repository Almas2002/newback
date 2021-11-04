import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../product/product.entity";
import {User} from "../user/user.entity";

export enum ShopTypes{
    SELLER="seller",
    WHOLESALE_COMPANY = "wholesale_company",
    MANUFACTURER = "manufacturer",
    RETAIL_COMPANY = "retail_company"

}
@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    logo:string

    @ManyToOne(()=>User,user=>user.establishedShops)
    @JoinTable()
    owner:User

    @Column()
    address:string

    @Column()
    city:string

    @Column()
    bin_iin:string;

    @Column({nullable:true})
    instagram:string

    @Column()
    shop_type:ShopTypes

    @OneToMany(()=>Product,product=>product.shop,{onDelete:"CASCADE"})
    products:Product[]

    @ManyToMany(()=>User,user=>user.shops)
    @JoinTable()
    admin_users:User[]


}
