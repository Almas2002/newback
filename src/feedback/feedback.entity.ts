import {BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Product} from "../product/product.entity";

@Entity()
export class Feedback{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    rating:number;
    @Column({type:"text"})
    comment:string;
    @ManyToOne(()=>User,user=>user)
    user:User;
    @ManyToOne(()=>Product,product=>product.feedback)
    product:Product;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    updateAt:Date;

    @BeforeUpdate()
    updateTimestamp(){
        this.updateAt = new Date();
    }
}