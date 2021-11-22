import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.entity";
import {Order} from "./order.entity";
import {UserDecorator} from "../user/decorator/User.decorator";
@ApiTags("Заказ")
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @ApiOperation({summary:"создание заказа"})
    @ApiResponse({status:201,type:Order})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    createOrder(@Body()dto: CreateOrderDto,@UserDecorator('id') id:number) {
        return this.orderService.createOrder(dto,id)
    }
    @ApiOperation({summary:"создание заказа"})
    @ApiResponse({status:201,type:Order})
    @Get()
    getOrders(){
        return  this.orderService.getOrder()
    }
    @ApiOperation({summary:"статус заказа"})
    @ApiResponse({status:201})
    @Get('status/:id')
    checkStatus(@Param('id')id:number){
        return this.orderService.checkStatus(id)
    }
    @ApiOperation({summary:"отмена заказа"})
    @ApiResponse({status:200,type:Order})
    @Put('cancellation-order/:id')
    cancellationOrder(@Param('id')id:number){
        return this.orderService.cancellationOrder(id)
    }

}
