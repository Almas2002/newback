import {Body, Controller, Get, Param, Post, Request, Res, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {RoleGuards} from "../auth/guards/role.guards";
import {Role} from "../auth/user-roles.decorator";


@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}


    @Post()
    createUser(@Body()dto:RegisterUserDto){
        return this.userService.createUser(dto)
    }
    @UseGuards(AuthGuard)
    @Get()
    getUser():Promise<User[]>{
        return this.userService.getUsers()
    }
    //@Role("ADMIN")
    //@UseGuards(RoleGuards)
    @Post("add-role")
    addRole(@Body()dto:AddRoleDto):Promise<User>{
        return this.userService.addRoleForUser(dto)
    }
    @Role("ADMIN")
    @UseGuards(RoleGuards)
    @Post("remove-role")
    removeRole(@Body()dto:AddRoleDto):Promise<User>{
        return this.userService.deleteRole(dto)
    }
    @UseGuards(AuthGuard)
    @Get("me")
    userMe(@Request()req){
        req.user.iat = null;
        req.user.exp = null;
        return req.user
    }
    @Get("activation/:activationLink")
    async activation(@Param("activationLink")link:string,@Res() req){
        await this.userService.activationAccount(link)
        req.redirect('https://www.google.ru/')
    }

}
