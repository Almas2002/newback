import {ApiProperty} from "@nestjs/swagger";

export class CreateSpecDto {
    @ApiProperty({example: "Комьютеры", description: "Категорий спецификаций"})
    title:string
}