import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Feedback} from "./feedback.entity";

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports:[TypeOrmModule.forFeature([Feedback])],
  exports:[FeedbackService]
})
export class FeedbackModule {}
