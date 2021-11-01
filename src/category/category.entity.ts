import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from "typeorm";
import {Product} from "../product/product.entity";


@Entity({name:"categories"})
@Tree("materialized-path")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

    @OneToMany(()=>Product,product=>product.category,{onDelete:"CASCADE"})
    products:Product[];
}
