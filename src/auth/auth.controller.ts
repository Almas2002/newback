import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {RegisterUserDto} from "../user/dto/register-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.entity";

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @ApiOperation({summary:"login пользователя"})
    @ApiResponse({status:200,type:User})
    @Post('login')
    login(@Body()dto: LoginUserDto,@Res({ passthrough: true }) res) {
        return console.log(process.env.DB_NAME +' '+ process.env.DB_HOST +
            ' '+ process.env.DB_USERNAME +
            ' '+ process.env.DB_PORT +' '+ process.env.DB_PASSWORD )
    }
    @ApiOperation({summary:"регестрация пользователя"})
    @ApiResponse({status:201,type:User})
    @Post('registration')
    registration(@Body()dto: RegisterUserDto, @Res({ passthrough: true }) res) {
        return this.authService.registration(dto,res)
    }
    @Get('refresh')
    refresh(@Req()request,@Res({passthrough:true})response){
        const {refreshToken} = request.cookies
        return this.authService.refresh(refreshToken,response)
    }
    @Get('logout')
    logout(@Req()request,@Res({passthrough:true})response){
        const {refreshToken} = request.cookies
        response.clearCookie('refreshToken')
        return this.authService.logout(refreshToken)

    }

}
