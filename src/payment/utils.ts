import {IPayment} from "./interface";

export const basicAuth = ()=>{
    return {
        auth: {
            username: process.env.CURRENT_ENV === 'PROD' ? process.env.PITECH_LOGIN : process.env.PITECH_TEST_LOGIN,
            password: process.env.CURRENT_ENV === 'PROD' ? process.env.PITECH_PASSWORD : process.env.PITECH_TEST_PASSWORD
        }
    }
}


export const makePaymentReqBody = (data:IPayment) => {
    if(data.cardsId){
        return {
            "amount": data.amount,
            "extClientRef": data.userId,
            "currency": "KZT",
            "description": "Test payment",
            "email": "support@pitech.kz",
            "extOrdersId": data.orderId,
            "errorReturnUrl": "https://pitech.kz/failure",
            "successReturnUrl": "https://pitech.kz/success",
            "payload": {
                "extraData": "extraData"
            },
            "cardsId": data.cardsId
        }

    }
    return {

        "amount": data.amount,
        "extClientRef": data.userId,
        "currency": "KZT",
        "description": "Оплата товаров в ADU24 Market",
        "email": "support@pitech.kz",
        "extOrdersId": data.orderId,
        "errorReturnUrl": "https://pitech.kz/failure",
        "successReturnUrl": "https://pitech.kz/success",
        "payload": {
            "extraData": "extraData"
        }
    }
}
export const bodyOfSavingCard = (id:number)=>({
    "extClientRef": id,
    "amount": 30,
    "currency": "KZT",
    "successReturnUrl": "http://localhost/success",
    "errorReturnUrl": "http://localhost/error"
})
