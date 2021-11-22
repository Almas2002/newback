import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {Repository} from "typeorm";
import {OrderProducts} from "./order-products.entity";
import {OrderShop, StatusOfOrder} from "./order-shop.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Product} from "../product/product.entity";
import {ProductService} from "../product/product.service";
import {PaymentService} from "../payment/payment.service";
import {DeliveryService} from "../delivery/delivery.service";

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(OrderProducts) private orderProductsRepository: Repository<OrderProducts>,
                @InjectRepository(OrderShop) private orderShopRepository: Repository<OrderShop>,
                private productService: ProductService,private paymentService:PaymentService,
                private deliveryService:DeliveryService
    ) {
    }

    async createOrder(dto: CreateOrderDto,id:number):Promise<string> {
        let product: Product;
        let order:Order;
        let totalPriceOrder: number = 0;
        order = await this.orderRepository.save({city: dto.city, address: dto.address,customer:{id},phone:dto.phone,date:dto.date})
        let orderShop: OrderShop = null;
        for (let i = 0; i < dto.orderProducts.length; i++) {
            product = await this.productService.getProductById(dto.orderProducts[i].productId)
            totalPriceOrder += product.price
            orderShop = await this.orderShopRepository.findOne({where: {shop: product.shop.id, order: {id:order.id}}})
            if (orderShop) {

                await this.createOrderProducts({
                    product: product.id,
                    qty: dto.orderProducts[i].qty,
                    orderShop: orderShop.id
                })
                await this.orderShopRepository.update({id: orderShop.id}, {totalPrice: orderShop.totalPrice + product.price})
                orderShop = null;
                product = null;

            } else {
                orderShop = await this.orderShopRepository.save({order: {id:order.id}, shop: {id:product.shop.id}})
                await this.createOrderProducts({
                    product: product.id,
                    qty: dto.orderProducts[i].qty,
                    orderShop: orderShop.id
                })
                await this.orderShopRepository.update({id: orderShop.id}, {totalPrice: orderShop.totalPrice + product.price})
                orderShop = null;
                product = null;
            }

        }
        await this.orderRepository.update({id: order.id}, {totalPrice: totalPriceOrder})
        order = await this.orderRepository.findOne({where: {id: order.id}})
        return await this.paymentService.makePayment({cardsId:dto.cardsId,userId:id,order})

    }

    async createOrderProducts(dto: { product: number, qty: number, orderShop: number }) {
        return await this.orderProductsRepository.save({...dto,product:{id:dto.product}})
    }

    async createOrderShop(dto: { productId: number, qty: number, shopId: number }) {

    }

    async getOrderProduct(id: number): Promise<OrderProducts> {
        return await this.orderProductsRepository.findOne({where: {id}})
    }

    async getShopOrders(shopId: number, orderId: number) {
        return await this.orderShopRepository.findOne({where: {shop: shopId, order: orderId}})
    }

    async getOrder() {
        return await this.orderRepository.find({
            relations: ["shopOrders",
                "shopOrders.products", "shopOrders.shop", "shopOrders.products.product"]
        })
    }

    async getOrderById(id: number): Promise<Order> {
        return await this.orderRepository.findOne({
            where: {id}, relations: ["shopOrders",
                "shopOrders.products", "shopOrders.shop", "shopOrders.products.product"]
        })
    }

    async getShopOrder(id:number):Promise<OrderShop>{
        return await this.orderShopRepository.findOne({where:{id},
            relations:["products", "shop","shop.owner", "products.product","order","order.customer"]
        })
    }
    async changeShopOrderStatus(id:number,status:StatusOfOrder):Promise<void>{
        await this.orderShopRepository.update({id},{status})
        await this.orderProductsRepository.update({orderShop:id},{status})
    }
    async updateShopOrderOderNo(id:number,orderNo:string){
        await this.orderShopRepository.update({id},{orderNo})
    }
    async checkStatus(orderShopId:number){
        const orderShop = await this.orderShopRepository.findOne(orderShopId)
        return  await this.deliveryService.checkStatus(orderShop.orderNo)
    }
    async cancellationOrder(orderShopId:number){
        const orderShop = await this.orderShopRepository.findOne(orderShopId)
        return await this.deliveryService.cancellationDelivery(orderShop.orderNo)
    }

}
