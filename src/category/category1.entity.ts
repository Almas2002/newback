import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from "typeorm";
import {Product} from "../product/product.entity";

@Entity()
@Tree("nested-set")
export class Category1 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @TreeChildren()
    children: Category1[];

    @TreeParent()
    parent: Category1;

    @OneToMany(()=>Product,product=>product.category,{onDelete:"CASCADE"})
    products:Product[]
}