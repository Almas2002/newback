import {User} from "../../../user/user.entity";
import {
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Message} from "../message/message.entity";
import {JoinedRoom} from "../joined-room/joined-room.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, user => user.rooms)
    @JoinTable()
    users: User[];

    @OneToMany(()=>Message,message=>message.room)
    messages:Message[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>JoinedRoom,joinedRoom=>joinedRoom.room)
    joinedUsers:JoinedRoom[]
}