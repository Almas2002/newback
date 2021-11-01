import {ConnectionOptions} from "typeorm";

export const config:ConnectionOptions = {
    type:'postgres',
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"12345",
    database:"newaduback",
    entities:[__dirname + "/**/*.entity{.ts,.js}"],
    synchronize:true
}