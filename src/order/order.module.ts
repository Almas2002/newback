import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {OrderShop} from "./order-shop.entity";
import {OrderProducts} from "./order-products.entity";
import {ProductModule} from "../product/product.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[TypeOrmModule.forFeature([Order,OrderShop,OrderProducts]),ProductModule]
})
export class OrderModule {}
