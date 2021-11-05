import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Shop} from "./shop.entity";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";
import {ProductModule} from "../product/product.module";
import {SpecModule} from "../spec/spec.module";
import {ShopAddress} from "./addressShop.entity";

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports:[TypeOrmModule.forFeature([Shop,ShopAddress]),UserModule,AuthModule,ProductModule,SpecModule]
})
export class ShopModule {}
