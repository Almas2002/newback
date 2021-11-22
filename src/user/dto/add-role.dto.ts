import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiOperation, ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example:"almas@gmail.com",description:"почта чтобы найти пользотеля"})
    @IsEmail({},{message:"не вервый формат email"})
    email:string
    @ApiProperty({example:"ADMIN",description:"название роля чтобы найти роль"})
    @IsNotEmpty({message:"это поля не должно быть пустым"})
    role:string
}