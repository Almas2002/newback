import {Category} from "../category/category.entity";
import {SpecValues} from "./spec-values.entity";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('spec')
export class Spec {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @ManyToMany(()=>Category,category=>category.id)
    @JoinTable()
    categories:Category[]
    @OneToMany(()=>SpecValues,value=>value.title)
    @JoinTable()
    values:SpecValues[]
}