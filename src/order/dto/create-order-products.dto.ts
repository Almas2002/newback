import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderProductsDto {
    @ApiProperty({example:"1",description:"количество товара"})
    qty:number;
    @ApiProperty({example:"1",description:"идентификатов товара"})
    productId:number;
}