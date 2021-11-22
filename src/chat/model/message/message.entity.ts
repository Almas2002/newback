import {User} from "../../../user/user.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Product} from "../../../product/product.entity";
import {Room} from "../room/room.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    text: string;
    @ManyToOne(() => Product, product => product.messages, {nullable: true})
    product: Product
    @ManyToOne(() => User, user => user.messages, {nullable: false})
    user: User;
    @ManyToOne(() => Room, room => room.messages, {nullable: false})
    room: Room
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

}