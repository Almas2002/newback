import {ShopTypes} from "../shop.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateShopDto {
    @ApiProperty({example:"Sulpak",description:"название магазина",type:"string"})
    name:string
    @ApiProperty({example:"какое то описание магазина",description:"описание на магазин",type:"string"})
    description:string
    @ApiProperty({example:"улица",description:"улица магазина",type:"string"})
    street:string
    @ApiProperty({example:"050000",description:"почтовый индекс",type:"string"})
    zipCode:string
    @ApiProperty({example:"Алматы",description:"Город",type:"string"})
    legalCity:string
    @ApiProperty({example:"Проспект Сейфулина 458/1,4 этаж 412 кабинет",description:"адрес",type:"string"})
    legalAddress:string
    @ApiProperty({example:"almas_zhumakhanov",description:"инстаграм магазина",type:"string"})
    instagram:string
    @ApiProperty({example:"seller",description:"тип магазина",enum:ShopTypes})
    shop_type:ShopTypes
    @ApiProperty({example:"87075545401",description:"телефон номер магазина",type:"string"})
    phone:string
    @ApiProperty({example:"0000075554",description:"адрес",type:"string"})
    bin_iin:string;
}