import { Module } from '@nestjs/common';
import { SpecController } from './spec.controller';
import { SpecService } from './spec.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Spec} from "./spec.entity";
import {SpecValues} from "./spec-values.entity";
import {CategoryModule} from "../category/category.module";
import {ProductModule} from "../product/product.module";

@Module({
  controllers: [SpecController],
  providers: [SpecService],
  imports:[TypeOrmModule.forFeature([Spec,SpecValues]),CategoryModule,ProductModule],
  exports:[SpecService]
})
export class SpecModule {}
