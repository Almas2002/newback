import {IsNotEmpty, IsUppercase} from "class-validator";

export class CreateRoleDto {
    @IsUppercase({message:"это поля должен только с болшими буквами"})
    value:string;

    @IsNotEmpty({message:"это поля не должен быть пустым"})
    description:string;
}