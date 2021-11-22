import {IsNotEmpty, IsUppercase} from "class-validator";
import {ApiOperation, ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example:"ADMIN",description:"Нахвание роли"})
    @IsUppercase({message:"это поля должен только с болшими буквами"})
    value:string;
    @ApiProperty({example:"админ нашего сайта",description:"Описание роли"})
    @IsNotEmpty({message:"это поля не должен быть пустым"})
    description:string;
}