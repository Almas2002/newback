import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {FeedbackService} from "./feedback.service";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {UserDecorator} from "../user/decorator/User.decorator";
import {IQueryFeedback} from "./interfaces";

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService:FeedbackService) {}
    @UseGuards(AuthGuard)
    @Post()
    create(@Body()dto:CreateFeedbackDto,@UserDecorator('id')id:number){
        return this.feedbackService.createFeedBack({...dto},id)
    }
    @Get()
    getFeedback(@Query()query:IQueryFeedback){
        return this.feedbackService.getFeedBack(query)
    }

}
