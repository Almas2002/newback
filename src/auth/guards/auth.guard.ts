import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwt:JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        try {
            const req = context.switchToHttp().getRequest()
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                throw new UnauthorizedException("Вы не зарегестрированы")
            }
            req.user = this.jwt.verify(token);
            return true
        }catch (e) {
            throw new UnauthorizedException("Вы не зарегестрированы")
        }
    }

}