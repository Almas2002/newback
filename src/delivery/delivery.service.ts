import {Injectable} from '@nestjs/common';
import {OrderShop} from "../order/order-shop.entity";
import {createDelivery, checkStatusBody,cancellationOrder} from "./utils";
import {ICancellationOrder, ICheckStatus, IOrder, IShop} from "./interfaces";
import {DeliveryServiceToRequest} from "./service";
import {xml2json} from "xml-js";
import {Json} from "../shop/interfaces";

@Injectable()
export class DeliveryService {
    constructor() {
    }

    async createDelivery(orderShop: OrderShop, date: Date) :Promise<Json>{
        const {order, shop} = orderShop;

        const shopDetail: IShop = {
            legalCity: shop.legalCity,
            legalAddress: shop.legalAddress,
            contactPerson: shop.owner.firstName + " " + shop.owner.phone,
            name: shop.name,
            phone: shop.phone
        }
        const orderDetail: IOrder = {
            address: order.address,
            name: order.customer.firstName,
            city: order.city,
            phone: order.phone
        }
        let items: any[] = []
        let itemsName: string[] = []
        for (let i = 0; i < orderShop.products.length; i++) {
            items.push(`<item extcode="${orderShop.products[i].id}" quantity="${orderShop.products[i].qty}">${orderShop.products[i].product.name}</item>`)
            itemsName.push(orderShop.products[i].product.name)

        }
        const xml = createDelivery({shop: shopDetail, date, order: orderDetail}, items, itemsName)
        const data = await DeliveryServiceToRequest.deliveryRequest(xml)
        let json =  xml2json(data,{compact:true})
        const response:Json = JSON.parse(json).neworder
        return response
    }

    async checkStatus(orderNo: string):Promise<ICheckStatus> {
        const xml = checkStatusBody(orderNo)
        const json = xml2json(await DeliveryServiceToRequest.deliveryRequest(xml),{compact:true})
        const status:ICheckStatus = JSON.parse(json).statusreq?.order?.status
        return status
    }

    async cancellationDelivery(orderNo:string) :Promise<ICancellationOrder>{
        const xml = cancellationOrder(orderNo)
        const json = xml2json(await DeliveryServiceToRequest.deliveryRequest(xml),{compact:true})
        return JSON.parse(json).cancelorder
    }
}
