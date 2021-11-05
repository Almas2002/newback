import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {Repository} from "typeorm";
import {OrderProducts} from "./order-products.entity";
import {OrderShop} from "./order-shop.entity";
import {CreateOrderProductsDto} from "./dto/create-order-products.dto";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Product} from "../product/product.entity";
import {ProductService} from "../product/product.service";

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(OrderProducts) private orderProductsRepository: Repository<OrderProducts>,
                @InjectRepository(OrderShop) private orderShopRepository: Repository<OrderShop>,
                private productService: ProductService
    ) {
    }

    async createOrder(dto: CreateOrderDto) {
        let product: Product;
        let order = null;
        order = await this.orderRepository.save({city: dto.city, address: dto.address})
        let orderShop: OrderShop = null;
        for (let i = 0; i < dto.orderProducts.length; i++) {
            product = await this.productService.getProductById(dto.orderProducts[i].productId)
            orderShop = await this.orderShopRepository.findOne({where: {shop:product.shop.id, order:order.id}})
            if (orderShop) {

                await this.orderProductsRepository.save({
                    product:product.id,
                    qty: dto.orderProducts[i].qty, orderShop:orderShop.id
                })
                orderShop = null;
                product = null;

            } else {
                orderShop = await this.orderShopRepository.save({order:order.id, shop: product.shop.id})
                await this.orderProductsRepository.save({
                    product:product.id,
                    qty: 48, orderShop:orderShop.id
                })
                orderShop = null;
                product = null;
            }

        }
        return order

    }

    async createOrderProducts(dto: { productId: number, qty: number, shopId: number }) {
        return await this.orderProductsRepository.save(dto)
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
        return await this.orderRepository.find({relations:["shopOrders","shopOrders.products","shopOrders.products.product"]})
    }

}
