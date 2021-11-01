import {IsEmail, IsNotEmpty} from "class-validator";

export class AddRoleDto {

    @IsEmail({},{message:"не вервый формат email"})
    email:string

    @IsNotEmpty({message:"это поля не должно быть пустым"})
    role:string
}