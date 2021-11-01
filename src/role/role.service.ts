import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "./role.entity";
import {Repository} from "typeorm";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepository:Repository<Role>) {}

    async createRole(dto:CreateRoleDto):Promise<Role>{
        return this.roleRepository.save(dto);
    }
    async getRoles():Promise<Role[]>{
        return this.roleRepository.find()
    }
    async getRoleByValue(value:string){
        return this.roleRepository.findOne({value})
    }
}
