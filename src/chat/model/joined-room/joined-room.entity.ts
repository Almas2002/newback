import {Room} from "../room/room.entity";
import {User} from "../../../user/user.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class JoinedRoom{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    socketId:string;
    @ManyToOne(()=>Room,room=>room.joinedUsers)
    room:Room;
    @ManyToOne(()=>User,user=>user.joinedRooms)
    user:User;
}