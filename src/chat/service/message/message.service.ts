import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../../model/message/message.entity";
import {Repository} from "typeorm";
import {MessageI} from "../../model/message/message.interface";
import {RoomI} from "../../model/room/room.interface";
import {PageI} from "../../model/page.interface";

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private messageRepository: Repository<Message>) {
    }

    async createMessage(message: MessageI):Promise<Message> {
        return await this.messageRepository.save({...message,user:{id:message.userId},room:{id:message.roomId}})
    }

    async getAllMessage(id: number, pagination: PageI) {
        const query = this.messageRepository
            .createQueryBuilder("message")
            .leftJoin("message.room", "room")
            .where("room.id = :roomId", {roomId: id})
            .leftJoinAndSelect("message.user", "user")
            .orderBy("room.updatedAt", "DESC");
        query.limit(pagination.limit)
        query.offset(pagination.offset)

        return query.getMany()
    }
}