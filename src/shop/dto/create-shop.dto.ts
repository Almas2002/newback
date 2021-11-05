import {ShopTypes} from "../shop.entity";

export class CreateShopDto {
    name:string
    description:string
    logo:string
    street:string
    zipCode:string
    legalCity:string
    legalAddress:string
    instagram:string
    shop_type:ShopTypes
    email:string;
    bin_iin:string;
}