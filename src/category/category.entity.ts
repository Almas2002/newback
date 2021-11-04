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


@Entity({name: "categories"})
@Tree("materialized-path")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @TreeChildren()
    children: Category[];

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
