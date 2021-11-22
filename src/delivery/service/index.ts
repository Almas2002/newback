import axios from "axios";

export class DeliveryServiceToRequest{
    static async deliveryRequest(reqBody){
        const {data} = await axios.get(process.env.CURRENT_ENV === 'PROD'
            ? process.env.COURIER_PROD_URL
            : process.env.COURIER_PROD_URL
            ,{data:reqBody}
        )
        return data
    }

}