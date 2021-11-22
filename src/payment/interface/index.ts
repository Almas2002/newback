import {Order} from "../../order/order.entity";

export interface IPayment {
    cardsId?:string;
    amount:number;
    userId:number;
    orderId:number;
    productNames:string[]
}
export interface IOrderPayment {
    order:Order,
    userId:number;
    cardsId:string;
}
export interface IResponseMakePayment {
    amount:number;
    uuid:string;
    orderDate:Date;
    ordersId:number;
    paymentUrl:string;
    successReturnUrl:string;
    errorReturnUrl:string;
    clientsId:number;
}
export interface ISaveCard {
    paymentUrl:string
}
export interface IUserCards {
    cardsId:string;
    maskedPan:string;
    holderName:string;
    issuer:string;
    clientsId:number;
    state:string;
    createTime:string;
    updateTime:string;
    confirmed:boolean
}
