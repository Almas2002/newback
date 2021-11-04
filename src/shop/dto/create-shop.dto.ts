import {ShopTypes} from "../shop.entity";

export class CreateShopDto {
    name:string
    description:string
    logo:string
    address:string
    city:string
    instagram:string
    shop_type:ShopTypes
    email:string;
    bin_iin:string;
}