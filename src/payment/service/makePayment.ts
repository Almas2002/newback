import axios, {AxiosResponse} from "axios";
import {IResponseMakePayment, ISaveCard, IUserCards} from "../interface";
import {basicAuth} from "../utils";


export class MakePayment {
    private static url(url: string) {
        return process.env.CURRENT_ENV === 'PROD'
            ? process.env.PRODUCTION_PAYMENT_URL
            : process.env.TEST_PAYMENT_URL + url
    }

    static async makePayment(reqBody): Promise<AxiosResponse<IResponseMakePayment>> {
        return await axios.post<IResponseMakePayment>(this.url("payments/cards/charge"),
            reqBody, {auth: basicAuth().auth}
        )
    }

    static async saveCard(reqBody): Promise<AxiosResponse<ISaveCard>> {
        return await axios.post<ISaveCard>(this.url("cards/save"),
            reqBody, {auth: basicAuth().auth}
        )
    }

    static async getCards(id): Promise<AxiosResponse<IUserCards []>> {
        return await axios.get<IUserCards []>(this.url(`cards?extClientRef=${id}`),
            {auth: basicAuth().auth}
        )
    }

    static async makePaymentWithSavedCard(reqBody) {
        return await axios.post<IResponseMakePayment>(this.url("payments/tokens/charge"),
            reqBody, {auth: basicAuth().auth}
        )
    }
}