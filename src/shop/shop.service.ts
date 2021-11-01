import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Shop} from "./shop.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ShopService {
    constructor(@InjectRepository(Shop)private shopRepository:Repository<Shop>) {}

    async createRepository(){

    }
}
