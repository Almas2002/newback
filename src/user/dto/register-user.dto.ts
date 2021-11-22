import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty({example:"almas@gmail.com",description:"Потча"})
    @IsEmail({},{message:"не вервый формат email"})
    email:string

    @ApiProperty({example:"12345",description:"пороль"})
    @IsNotEmpty({message:"это поля не должен быть пустым"})
    password:string

    @ApiProperty({example:"87075545401",description:"номер телефона пользователя"})
    phone:string;

    @ApiProperty({example:"Алмас",description:"Имя пользователя"})
    firstName:string;
    @ApiProperty({example:"Жумаханов",description:"фамилья пользователя"})
    lastName:string;

    activationLink:string
}