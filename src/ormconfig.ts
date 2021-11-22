import {ConnectionOptions} from "typeorm";
require('dotenv').config()

export const config:ConnectionOptions = {
    type:'postgres',
    host:process.env.DB_HOST,
    port:Number(process.env.PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[__dirname + "/**/*.entity{.ts,.js}"],
    synchronize:true,

}
