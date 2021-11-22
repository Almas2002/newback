import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {MyRequestInterface} from "../../shop/interfaces";

export const UserDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<MyRequestInterface>()
    if(data){
       return req.user[data]
    }
    return req.user
})