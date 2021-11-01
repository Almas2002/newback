import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../user/dto/login-user.dto";
import {RegisterUserDto} from "../user/dto/register-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    login(@Body()dto: LoginUserDto,@Res({ passthrough: true }) res) {
        return this.authService.login(dto,res)
    }

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
