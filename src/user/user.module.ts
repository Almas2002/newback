import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";
import {ProductModule} from "../product/product.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([User]),RoleModule,forwardRef(()=>AuthModule),ProductModule],
  exports:[UserService]
})
export class UserModule {}
