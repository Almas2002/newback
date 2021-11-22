export interface ICreateDelivery {
    shop:IShop;
    order:IOrder
    date:Date
}

export interface IShop {
    name: string;
    legalCity: string;
    legalAddress:string;
    phone:string;
    contactPerson:string
}
export interface IOrder {
    name:string;
    phone:string;
    city:string;
    address:string
}
export interface ICheckStatus {
    _attributes:{
        eventstore:string;
        eventtime:string;
        createtimegmt:string;
        message?:string;
        title?:string;
        error?:string;
        errormsg?:string;
        errormsgru?:string
    },
    _text?:string
}
export interface ICancellationOrder {
    _attributes:{
        orderno:string;
        title?:string;
        error:string;
        errormsg?:string;
        errormsgru?:string
    }
}