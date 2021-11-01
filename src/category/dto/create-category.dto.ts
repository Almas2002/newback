import {IsNotEmpty, IsOptional, Length} from "class-validator";

export class CreateCategoryDto {

    @Length(2,20,{message:"длина этого поля должен быть не меньше 2 и не больше 20"})
    name:string

    @IsNotEmpty({message:"это поле не должен быть пустым"})
    icon:string

    @IsOptional()
    parentCategoryId:number
}