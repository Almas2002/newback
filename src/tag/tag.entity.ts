import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

enum TagTypes {

}

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
}