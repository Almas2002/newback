import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../product/product.entity";
import {User} from "../user/user.entity";

enum ShopTypes{
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
    @Column()
    address:string
    @Column()
    city:string
    @Column()
    instagram:string
    @Column()
    shop_type:ShopTypes
     @OneToMany(()=>Product,product=>product.shopId,{onDelete:"CASCADE"})
    products:Product[]

    @ManyToMany(()=>User,user=>user.shops)
    @JoinTable()
    users:User[]


}
