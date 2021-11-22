import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Category} from "../category/category.entity";
import {FileModule} from "../file/file.module";
import {FeedbackModule} from "../feedback/feedback.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[TypeOrmModule.forFeature([Product,Category]),FileModule,FeedbackModule],
  exports:[ProductService]
})
export class ProductModule {}
