import {forwardRef, Module} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {OrderShop} from "./order-shop.entity";
import {OrderProducts} from "./order-products.entity";
import {ProductModule} from "../product/product.module";
import {PaymentModule} from "../payment/payment.module";
import {AuthModule} from "../auth/auth.module";
import {DeliveryModule} from "../delivery/delivery.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[TypeOrmModule.forFeature([Order,OrderShop,OrderProducts]),ProductModule,PaymentModule,AuthModule,DeliveryModule],
  exports:[OrderService]
})
export class OrderModule {}
