import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {FileModule} from "../file/file.module";


@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports:[TypeOrmModule.forFeature([Category]),FileModule],
  exports:[CategoryService]
})
export class CategoryModule {}
