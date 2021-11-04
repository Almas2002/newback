import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SpecService} from "./spec.service";
import {CreateSpecDto} from "./dto/create-spec.dto";
import {CreateSpecValueDto} from "./dto/create-spec-value.dto";
import {AddCategoryToSpecDto} from "./dto/add-category-to-spec.dto";
import {AddSpecToProductDto} from "./dto/add-spec-to-product.dto";

@Controller('spec')
export class SpecController {
    constructor(private specService:SpecService) {}

    @Post()
    createSpec(@Body()dto:CreateSpecDto){
        return this.specService.createSpec(dto)
    }
    @Post('value')
    createSpecValue(@Body()dto:CreateSpecValueDto){
        return this.specService.createSpecValue(dto)
    }
    @Get()
    getSpec(){
        return this.specService.getSpec()
    }
    @Post('add-category')
    addCategory(@Body()dto:AddCategoryToSpecDto){
        return this.specService.addCategoryForSpec(dto)
    }
    @Post('remove-category')
    deleteCategory(@Body()dto:AddCategoryToSpecDto){
        return this.specService.deleteCategorySpec(dto)
    }
    @Get(':id')
    getSpecWithId(@Param('id')id:number){
        return this.specService.getSpecWithCategory(id)
    }
    @Post('add-product')
    addProduct(@Body()dto:AddSpecToProductDto){
        return this.specService.addSpecToProduct(dto)
    }
    @Delete('remove-product')
    removeProduct(@Body()dto:AddSpecToProductDto){
        return this.specService.deleteSpecInProduct(dto)
    }
}
