import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../../user/user.entity";

@Entity()
export class ConnectedUser {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.connections)
    user: User;
    @Column()
    socketId: string;
}