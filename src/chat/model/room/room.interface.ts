import {User} from "../../../user/user.entity";
import {Product} from "../../../product/product.entity";
import {Message} from "../message/message.entity";

export interface RoomI {
    id?: number;
    product:Product;
    users?: User[];
    created_at?: Date;
    updated_at?: Date;
    messages:Message[]
}
