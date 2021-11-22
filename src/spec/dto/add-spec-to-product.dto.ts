import {ApiOperation, ApiProperty, ApiResponse} from "@nestjs/swagger";
import {Spec} from "../spec.entity";

export class AddSpecToProductDto {
    @ApiProperty({example:"1",description:"id значений спецификаций"})
    specValueId:number;
    @ApiProperty({example:"1",description:"id продукта"})
    productId:number;
}