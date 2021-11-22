import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ConnectedUser} from "../../model/connected-room/connected-user.entity";
import {Repository} from "typeorm";
import {ConnectedUserI} from "../../model/connected-room/connected-user.interface";
import {User} from "../../../user/user.entity";

@Injectable()
export class ConnectedUserService {
    constructor(@InjectRepository(ConnectedUser) private connectedUserRepository: Repository<ConnectedUser>) {
    }

    async createConnectedUser(data: ConnectedUserI) {
        return await this.connectedUserRepository.save({socketId: data.socketId, user: {id: data.userId}})
    }

    async findByUser(user: User): Promise<ConnectedUser[]> {
        return await this.connectedUserRepository.find({user})
    }

    async deleteBySocketId(socketId: string) {
        await this.connectedUserRepository.delete({socketId})
    }

    async deleteAll() {
        await this.connectedUserRepository.createQueryBuilder().delete().execute()
    }
}