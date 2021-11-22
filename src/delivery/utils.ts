import {ICreateDelivery} from "./interfaces";
import {log} from "util";

const auth = () => {
    return ` <auth extra="${process.env.COURIER_EXTRA}"
        login="${process.env.CURRENT_ENV === 'PROD' ? process.env.COURIER_LOGIN_ORIG : process.env.COURIER_LOGIN}"
        pass="${process.env.CURRENT_ENV === 'PROD' ? process.env.COURIER_PASS_ORIG : process.env.COURIER_PASS}"
        />`
}

export const createDelivery = (data: ICreateDelivery, items: any, itemsName: string[]) => {
    let date = data.date.getFullYear() + "-" + (data.date.getMonth() + 1) + "-" + data.date.getDate()
    return `<?xml version="1.0" encoding="UTF-8"?>
     <neworder>
        ${auth()}
          <order>
    <sender>
     <company>${data.shop.name}</company>
     <town code="1409">${data.shop.legalCity}</town>
     <address>${data.shop?.legalAddress}</address>
     <phone>${data.shop?.phone}</phone>
     <person>${data.shop?.contactPerson}</person>
     <date>${date}</date>
   </sender>
   <receiver>
     <person>${data.order?.name}</person>
     <phone>${data.order?.phone}</phone>
     <town code="1409">${data.order.city}</town>
     <address>${data.order.address}</address>
     <date>${date}</date>
   </receiver>
    <items>
    ${items.map(e => e)}
    </items>
   <weight>${0}</weight>
   <paytype>NO</paytype>
   <pickup>YES</pickup>
   <instruction>Товары: ${itemsName.join(' ')} \n Откуда: ${data.shop?.legalAddress} \n Куда: ${data.order?.address}</instruction>
 </order>
</neworder>`
}

export const checkStatusBody = (orderNo: string) => {
    return `
    <?xml version="1.0" encoding="UTF-8" ?>
      <statusreq>
        ${auth()}
       <client>CLIENT</client>
       <orderno>${orderNo}</orderno>
      </statusreq>
    `
}
export const cancellationOrder = (orderNo:string)=>{
    return `
    <?xml version="1.0" encoding="UTF-8" ?>
       <cancelorder>
       ${auth()}
         <order orderno="${orderNo}" ordercode="" />
       </cancelorder>`
}