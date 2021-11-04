import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../role/role.entity";
import {Shop} from "../shop/shop.entity";

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string

    @Column({default:false})
    activated:boolean;

    @Column()
    activationLink:string

    @Column()
    phone:string

    @Column({default:false})
    blocked:boolean

    @Column({nullable:true})
    avatar:string

    @ManyToMany(()=>Role, role =>role.value)
    @JoinTable()
    roles:Role[]

    @OneToMany(()=>Shop,shop=>shop.owner)
    establishedShops:Shop[]

    @ManyToMany(()=>Shop,shop=>shop.admin_users)
    @JoinTable()
    shops:Shop[];


}