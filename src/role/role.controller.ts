import {Body, Controller, Get, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./role.entity";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "../product/product.entity";

@ApiTags("Роль")
@Controller('role')
export class RoleController {
    constructor(private roleService:RoleService) {}

    @ApiOperation({summary:"Создать новый роль",})
    @ApiResponse({status:201,type:Role})
    @Post()
    createRole(@Body()dto:CreateRoleDto):Promise<Role>{
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary:"получить все роли",})
    @ApiResponse({status:200,type:[Role]})
    @Get()
    getRoles():Promise<Role[]>{
        return this.roleService.getRoles()
    }
}
