import {IsNotEmpty, IsOptional, Length} from "class-validator";
import {ApiOperation, ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({example:"Смартфоны",required:true,description:"категория для товартов и услуг"})
    @Length(2,20,{message:"длина этого поля должен быть не меньше 2 и не больше 20"})
    name:string

    @ApiProperty({example:"icon.png", required:true,description:"категория для товартов и услуг"})
    @IsNotEmpty({message:"это поле не должен быть пустым"})
    icon:string

    @ApiProperty({example:"1 (не обязательная поля)",required:false,description:"родитель категорий"})
    @IsOptional()
    parentCategoryId:number
}