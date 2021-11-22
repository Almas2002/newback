import {User} from "../../../user/user.entity";
import {RoomI} from "../../model/room/room.interface";
import {Room} from "../../model/room/room.entity";

export interface JoinedRoomI {
    id?: number;
    socketId: string;
    user: User;
    roomId: number;
}