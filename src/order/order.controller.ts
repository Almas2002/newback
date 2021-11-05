import {Body, Controller, Get, Post} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post()
    createOrder(@Body()dto: CreateOrderDto) {
        return this.orderService.createOrder(dto)
    }
    @Get()
    getOrders(){
        return  this.orderService.getOrder()
    }
}
