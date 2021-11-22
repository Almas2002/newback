import {Body, Controller, Get, Param, Post, Request, Res, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {RegisterUserDto} from "./dto/register-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {RoleGuards} from "../auth/guards/role.guards";
import {Role} from "../auth/user-roles.decorator";
import {UserDecorator} from "./decorator/User.decorator";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "../product/product.entity";

@ApiTags("Пользователь")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }


    @Post()
    createUser(@Body()dto: RegisterUserDto) {
        return this.userService.createUser(dto)
    }

    @UseGuards(AuthGuard)
    @Get()
    getUser(): Promise<User[]> {
        return this.userService.getUsers()
    }
    @ApiOperation({summary:"добавление роля для пользователя"})
    @ApiResponse({status:200,type:AddRoleDto})
    @Role("ADMIN")
    @UseGuards(RoleGuards)
    @Post("add-role")
    addRole(@Body()dto: AddRoleDto): Promise<User> {
        return this.userService.addRoleForUser(dto)
    }

    @ApiOperation({summary:"удаление роля для пользователя"})
    @ApiResponse({status:200,type:AddRoleDto})
    @Role("ADMIN")
    @UseGuards(RoleGuards)
    @Post("remove-role")
    removeRole(@Body()dto: AddRoleDto): Promise<User> {
        return this.userService.deleteRole(dto)
    }

    @ApiOperation({summary:"загрузить пользователя через его токен",})
    @ApiResponse({status:200,type:User})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("me")
    userMe(@UserDecorator()user: User) {
        return user
    }

    @ApiOperation({summary:"активация пользователя"})
    @ApiParam({name:"activationLink",type:"String"})
    @ApiResponse({status:308})
    @Get("activation/:activationLink")
    async activation(@Param("activationLink")link: string, @Res() req) {
        await this.userService.activationAccount(link)
        req.redirect('https://www.google.ru/')
    }

    @ApiOperation({summary:"добавить товар в избранное",})
    @ApiResponse({status:201,type:Product})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('add-favorite/:id')
    async addFavoriteProduct(@Param('id')id:number,@UserDecorator('email')email: string){
        return await this.userService.addFavoriteProduct(email,id)
    }

    @ApiOperation({summary:"удалить  товар из избранных",})
    @ApiResponse({status:201,type:Product})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('delete-favorite/:id')
    async deleteFavoriteProduct(@Param('id')id:number,@UserDecorator('email')email: string){
        return await this.userService.deleteFavoriteProduct(email,id)
    }

}
