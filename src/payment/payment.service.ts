import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {bodyOfSavingCard, makePaymentReqBody} from "./utils";
import {IOrderPayment} from "./interface";
import {MakePayment} from "./service/makePayment";
import {AxiosError} from "axios";

@Injectable()
export class PaymentService {
    async makePayment(dataFromOrder: IOrderPayment) {
        let titles: string[] = []
        let {cardsId, order ,userId} = dataFromOrder;
        const reqBody = makePaymentReqBody({orderId: order.id, amount: order.totalPrice, productNames: titles, userId, cardsId})
        try {
            if(cardsId){
                const {data} = await MakePayment.makePaymentWithSavedCard(reqBody)
                return data.paymentUrl
            }
            const {data} = await  MakePayment.makePayment(reqBody)
            return data.paymentUrl
        }catch (e: AxiosError | any ) {
            throw new HttpException("что то пошло не так по пробуйте позже",HttpStatus.BAD_REQUEST)
        }
    }


    async saveCard(id:number) {
     const reqBody = bodyOfSavingCard(id)
        try {
            const {data} = await MakePayment.saveCard(reqBody)
            return data.paymentUrl
        }catch (e) {
            console.log(e)
            throw new HttpException("что то пошло не так по пробуйте позже",HttpStatus.BAD_REQUEST)
        }
    }
    async getCards(id:number){
        try {
            const {data} = await MakePayment.getCards(id)
            return data
        }catch (e) {
            throw new HttpException("что то пошло не так по пробуйте позже",HttpStatus.BAD_REQUEST)
        }
    }


}
