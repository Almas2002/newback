import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./product.entity";
import {Category} from "../category/category.entity";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[TypeOrmModule.forFeature([Product,Category])],
  exports:[ProductService]
})
export class ProductModule {}
