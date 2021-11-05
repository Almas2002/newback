export class AddProductToShopDto {
    product:{
        name: string
        categoryId: number
        category1Id: number
        shopId: number;
    }
    specs:number[]
}