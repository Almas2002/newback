import {CreateOrderProductsDto} from "./create-order-products.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({example:"Сейфулина Толеби Майсат 64",description:"адрес куда доставлять"})
    address:string;
    @ApiProperty({example:"Алматы",description:"Город"})
    city:string;
    @ApiProperty({example:"[{qty:1;productId:1},{qty:5;productId:4}]",description:"продукт и количество"})
    orderProducts:CreateOrderProductsDto[]
    @ApiProperty({example:"айди сохраненной карточки",description:"айди сохраненной карточки"})
    cardsId?:string
    @ApiProperty({example:"87075545401",description:"телефон номер заказщика"})
    phone:string
    @ApiProperty({example:"yyyy-mm-dd (2021-11-22)",description:"заказать на этот день (выходные дни не работают)"})
    date:string
}