import {ApiProperty} from "@nestjs/swagger";

export class AddCategoryToSpecDto {
    @ApiProperty({example:"1",description:"id категорий"})
    categoryId:number
    @ApiProperty({example:"1",description:"id спецификафий"})
    specId:number
}