import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {AuthGuard} from "../auth/guards/auth.guard";
import {UserDecorator} from "../user/decorator/User.decorator";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService:PaymentService) {}
    @UseGuards(AuthGuard)
    @Post('save-card')
    saveCard(@UserDecorator('id')id:number){
        console.log("hello")
        return this.paymentService.saveCard(id)
    }
    @UseGuards(AuthGuard)
    @Get('cards')
    getCards(@UserDecorator('id')id:number){
        return this.paymentService.getCards(id)
    }
}
