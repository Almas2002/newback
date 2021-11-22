import {
    Column,
    Entity, JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {Product} from "../product/product.entity";
import {Spec} from "../spec/spec.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity({name: "categories"})
@Tree("materialized-path")
export class Category {
    @ApiProperty({example:1,description:"айди категорий"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"Обуви",description:"названия категорий"})
    @Column()
    name: string

    @ApiProperty({example:"icon.jpg",description:"иконка категорий"})
    @Column({nullable:true})
    icon:string;

    @TreeChildren()
    children: Category[];

    @ApiProperty({example:{
        id:1,
            name:"радительская категория",
            icon:"parent.jpg"
        },
        description:"радительская категория"
    })
    @TreeParent()
    parent: Category;

    @OneToMany(() => Product, product => product.category, {onDelete: "CASCADE"})
    products: Product[];

    @ManyToMany(() => Spec, spec => spec.categories)
    @JoinTable({
        name: 'spec_categories_categories',
    })
    specs: Spec[];
}
