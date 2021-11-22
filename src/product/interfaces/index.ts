import {Product} from "../product.entity";

export interface IQueryParamProducts {
    limit?:number;
    offset?:number;
    categoryId?:number;
    shopId?:number
}
export interface IFindAllProduct {
    products:Product[]
    count:number
}