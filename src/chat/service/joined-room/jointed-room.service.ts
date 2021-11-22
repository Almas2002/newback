import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {JoinedRoom} from "../../model/joined-room/joined-room.entity";
import {Repository} from "typeorm";
import {JoinedRoomI} from "./message.entity";
import {User} from "../../../user/user.entity";
import {RoomI} from "../../model/room/room.interface";
import {Room} from "../../model/room/room.entity";


@Injectable()
export class JointedRoomService {
    constructor(@InjectRepository(JoinedRoom) private joinedRoomRepository:Repository<JoinedRoom>) {}

    async create(data:JoinedRoomI){
        return await this.joinedRoomRepository.save({...data,room:{id:data.roomId}})
    }
    async findByUser(user:User){
        return this.joinedRoomRepository.find({user})
    }
    async findByRoom(room:Room){
        return this.joinedRoomRepository.find({room})
    }
    async deleteBySocketId(socketId:string){
        return this.joinedRoomRepository.delete({socketId})
    }
    async deleteAll(){
        await this.joinedRoomRepository.createQueryBuilder().delete().execute()
    }


}