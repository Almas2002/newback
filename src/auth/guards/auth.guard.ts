import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {MyRequestInterface} from "../../shop/interfaces";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor() {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        try {
            const req = context.switchToHttp().getRequest<MyRequestInterface>()
            if(!req.user){
                throw new UnauthorizedException("Вы не зарегестрированы")
            }
            return  true
        }catch (e) {
            throw new UnauthorizedException("Вы не зарегестрированы")
        }
    }

}