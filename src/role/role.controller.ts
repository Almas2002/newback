import {Body, Controller, Get, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./role.entity";

@Controller('role')
export class RoleController {
    constructor(private roleService:RoleService) {}
    @Post()
    createRole(@Body()dto:CreateRoleDto):Promise<Role>{
        return this.roleService.createRole(dto)
    }
    @Get()
    getRoles():Promise<Role[]>{
        return this.roleService.getRoles()
    }
}
