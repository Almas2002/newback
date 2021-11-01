import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {Category1} from "./category1.entity";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports:[TypeOrmModule.forFeature([Category,Category1])]
})
export class CategoryModule {}
