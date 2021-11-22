import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SpecService} from "./spec.service";
import {CreateSpecDto} from "./dto/create-spec.dto";
import {CreateSpecValueDto} from "./dto/create-spec-value.dto";
import {AddCategoryToSpecDto} from "./dto/add-category-to-spec.dto";
import {AddSpecToProductDto} from "./dto/add-spec-to-product.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "../product/product.entity";
import {Spec} from "./spec.entity";
import {SpecValues} from "./spec-values.entity";
@ApiTags("Описание")
@Controller('spec')
export class SpecController {
    constructor(private specService:SpecService) {}

    @ApiOperation({summary:"Создать спецификацию ",})
    @ApiResponse({status:201,type:Spec})
    @Post()
    createSpec(@Body()dto:CreateSpecDto){
        return this.specService.createSpec(dto)
    }
    @ApiOperation({summary:"Создать значение для  спецификаций",})
    @ApiResponse({status:201,type:SpecValues})
    @Post('value')
    createSpecValue(@Body()dto:CreateSpecValueDto){
        return this.specService.createSpecValue(dto)
    }
    @ApiOperation({summary:"получить спецификаций",})
    @ApiResponse({status:200,type:[Spec]})
    @Get()
    getSpec(){
        return this.specService.getSpec()
    }
    @ApiOperation({summary:"добавление категорий в  спецификацию",})
    @ApiResponse({status:201,type:Spec})
    @Post('add-category')
    addCategory(@Body()dto:AddCategoryToSpecDto){
        return this.specService.addCategoryForSpec(dto)
    }
    @ApiOperation({summary:"категорий категорий у  спецификаций",})
    @ApiResponse({status:200,type:Spec})
    @Post('remove-category')
    deleteCategory(@Body()dto:AddCategoryToSpecDto){
        return this.specService.deleteCategorySpec(dto)
    }
    @ApiOperation({summary:"получить спецификацию через id",})
    @ApiResponse({status:200,type:Spec})
    @Get(':id')
    getSpecWithId(@Param('id')id:number){
        return this.specService.getSpecWithCategory(id)
    }
    @ApiOperation({summary:"добавить в продукт спецификацию",})
    @ApiResponse({status:200,type:Spec})
    @Post('add-product')
    addProduct(@Body()dto:AddSpecToProductDto){
        return this.specService.addSpecToProduct(dto)
    }
    @ApiOperation({summary:"удалить из продукта спецификацию",})
    @ApiResponse({status:200,type:Spec})
    @Delete('remove-product')
    removeProduct(@Body()dto:AddSpecToProductDto){
        return this.specService.deleteSpecInProduct(dto)
    }
}
