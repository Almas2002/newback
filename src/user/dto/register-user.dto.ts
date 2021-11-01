import {IsEmail, IsNotEmpty} from "class-validator";

export class RegisterUserDto {
    @IsEmail({},{message:"не вервый формат email"})
    email:string

    @IsNotEmpty({message:"это поля не должен быть пустым"})
    password:string

    activationLink:string
}