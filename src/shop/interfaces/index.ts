import {Request} from "express";
import {User} from "../../user/user.entity";

export type Json = {
    createorder:{
        _attributes:{
            orderno:string;
            error:string
            errormsg:string;
            errormsgru:string;
            orderprice:number
        }
    }

}
export interface MyRequestInterface extends Request{
    user?:User
}