import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./token.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[JwtModule.register({
    secret:"hello world",
    signOptions:{expiresIn:"180m"}
  }),forwardRef(()=>UserModule),TypeOrmModule.forFeature([Token])],
  exports:[JwtModule,AuthService]
})
export class AuthModule {}
