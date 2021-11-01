import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Shop} from "./shop.entity";

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports:[TypeOrmModule.forFeature([Shop])]
})
export class ShopModule {}
