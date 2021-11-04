import {Spec} from "./spec.entity";
import {Product} from "../product/product.entity";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
@Entity('spec-values')
export class SpecValues {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    value:string
    @ManyToOne(()=>Spec,spec=>spec.values)
    @JoinTable()
    title:Spec
    @ManyToMany(()=>Product,product=>product.specs)
    @JoinTable()
    products:Product[]
}