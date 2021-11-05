import {CreateOrderProductsDto} from "./create-order-products.dto";

export class CreateOrderDto {
    address:string;
    city:string;
    orderProducts:CreateOrderProductsDto[]
}