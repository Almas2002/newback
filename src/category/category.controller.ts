import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Category} from "./category.entity";
import {FileInterceptor} from "@nestjs/platform-express";
@ApiTags("категория")
@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {}
    @ApiOperation({summary:"Создание категорий"})
    @ApiResponse({status:201,type:Category})
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    addCategory(@Body()dto:CreateCategoryDto,@UploadedFile()file:any){
        return this.categoryService.addCategory(dto,file)
    }
    @ApiOperation({summary:"fetch катерогий"})
    @ApiResponse({status:200,type:[Category]})
    @Get()
    getAllCategory(){
        return this.categoryService.getAllCategories()
    }
}
