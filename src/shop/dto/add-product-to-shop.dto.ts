import {ApiProperty} from "@nestjs/swagger";

export class AddProductToShopDto {
    @ApiProperty({example:"IPhone 12 pro max",description:"наввание товара"})
    name: string
    @ApiProperty({example:"1",description:"индентификатор категорий"})
    categoryId: number
    @ApiProperty({example:"1",description:"индентификатор магазина"})
    shopId: number;
    @ApiProperty({example:"самый лучший IPhone из 12 серий",description:"полное описание товара"})
    fullDesc:string;
    @ApiProperty({example:"IPhone из 12 серий",description:"краткое описание товара",type:"string"})
    smallDesc:string;
    @ApiProperty({example:"4600000",description:"краткое описание товара",type:"int"})
    price:number;
    @ApiProperty({example:"[1,2,3,4]",description:"идентификаторы спецификаций",type:"int[]"})
    specs:number[]
}