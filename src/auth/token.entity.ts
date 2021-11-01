import {Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity({name:'tokens'})
export class Token {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @OneToOne(()=>User,user=>user.id)
    @JoinTable()
    userId:number

    @Column()
    refresh_token:string;
}