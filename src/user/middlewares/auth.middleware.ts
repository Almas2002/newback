import {Injectable, NestMiddleware} from "@nestjs/common";
import {MyRequestInterface} from "../../shop/interfaces";
import {NextFunction, Response} from "express";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private jwtService:JwtService) {
    }
    use(req: MyRequestInterface, res: Response, next:NextFunction): any {
        if(!req.headers.authorization){
            req.user = null;
            next()
            return
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            req.user = this.jwtService.verify(token)
            next()
        }catch (e) {
            req.user = null;
            next()
        }
    }
}