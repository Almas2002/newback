import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../role/role.entity";
import {Shop} from "../shop/shop.entity";
import {Order} from "../order/order.entity";
import {Product} from "../product/product.entity";
import {Feedback} from "../feedback/feedback.entity";
import {Room} from "../chat/model/room/room.entity";
import {Message} from "../chat/model/message/message.entity";

import {JoinedRoom} from "../chat/model/joined-room/joined-room.entity";
import {ConnectedUser} from "../chat/model/connected-room/connected-user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({example: "almas@gmail.com", description: "mail пользователя"})
    @Column()
    email: string;
    @ApiProperty({example: "123456", description: "пороль пользователя"})
    @Column()
    password: string;
    @ApiProperty({example: "Алмас", description: "имя пользователя"})
    @Column()
    firstName: string;
    @ApiProperty({example: "Жумаханов", description: "фамилия пользователя"})
    @Column()
    lastName: string

    @ApiProperty({example:"true",description:"пользователь актевировал свой аккаунт через почту или нет"})
    @Column({default: false})
    activated: boolean;
    @ApiProperty({example: "ecbedd3a-0a37-4059-8dbe-520dd161b71d", description: "ссылка для активаций пороля"})
    @Column()
    activationLink: string
    @ApiProperty({example: "87075545401", description: "телефон номер пользователя"})
    @Column()
    phone: string

    @Column({default: false})
    blocked: boolean
    @ApiProperty({example: "avatar.png", description: "Аватарка для пользователя"})
    @Column({nullable: true})
    avatar: string

    @ManyToMany(() => Role, role => role.value)
    @JoinTable()
    roles: Role[]

    @ManyToMany(() => Product, product => product.users)
    @JoinTable()
    favorites: Product[]

    @ManyToMany(() => Room, room => room.users)
    rooms: Room []

    @OneToMany(() => Shop, shop => shop.owner)
    establishedShops: Shop[]

    @ManyToMany(() => Shop, shop => shop.admin_users)
    @JoinTable()
    shops: Shop[];

    @OneToMany(() => Order, order => order.customer)
    orders: Order[]

    @OneToMany(() => Feedback, feedback => feedback.user, {onDelete: "CASCADE"})
    feedback: Feedback[]

    @OneToMany(() => Message, message => message.user)
    messages: Message[]
    @OneToMany(() => ConnectedUser, connectedUser => connectedUser.user)
    connections: ConnectedUser

    @OneToMany(() => JoinedRoom, joinedRoom => joinedRoom.room)
    joinedRooms: JoinedRoom[]


}