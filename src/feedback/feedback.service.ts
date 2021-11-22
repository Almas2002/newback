import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Feedback} from "./feedback.entity";
import {getRepository, Repository} from "typeorm";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {IQueryFeedback} from "./interfaces";

@Injectable()
export class FeedbackService {
    constructor(@InjectRepository(Feedback)private feedbackRepository:Repository<Feedback>) {}

    async createFeedBack(dto:CreateFeedbackDto,id:number){
        return await this.feedbackRepository.save({...dto,user:{id},product:{id:dto.productId}})
    }

    async getFeedBack(query:IQueryFeedback){
        const queryBuilder = this.getQueryBuilder()
        if(query.limit){
            queryBuilder.limit(query.limit)
        }
        if(query.offset){
            queryBuilder.offset(query.offset)
        }
        queryBuilder.andWhere('feedback.productId = :id',{id:query.productId})
        const feedback = await queryBuilder.getMany()
        const count = await queryBuilder.getCount()
        return {count,feedback}
    }
    async getAVG(id:number):Promise<number>{
        const queryBuilder = this.getQueryBuilder()
        const feedback = await queryBuilder.getMany()
        const count = await queryBuilder.getCount()
        let avg:number = 0;
        for (let i = 0;i<feedback.length;i++){
            avg +=feedback[i].rating;
        }
        avg = avg/count
        return avg
    }
    private  getQueryBuilder(){
        return getRepository(Feedback)
            .createQueryBuilder("feedback")
            .leftJoin("feedback.product","product")
            .orderBy("feedback.createdAt","DESC")
    }
}
