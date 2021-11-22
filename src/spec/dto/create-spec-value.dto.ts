import {ApiProperty} from "@nestjs/swagger";

export class CreateSpecValueDto {
    @ApiProperty({example: "4", description: "значение для спецификаций"})
    value:string
    @ApiProperty({example: "1", description: "id спецификаций"})
    titleId:number
}