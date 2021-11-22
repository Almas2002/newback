import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example:"almas@gmail.com",description:"Потч"})
    email:string
    @ApiProperty({example: "12345", description: "пороль"})
    password:string
}