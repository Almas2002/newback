import {Body, Controller, Get, Post} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {}

    @Post()
    addCategory(@Body()dto:CreateCategoryDto){
        return this.categoryService.addCategory(dto)
    }
    @Get()
    getAllCategory(){
        return this.categoryService.getAllCategories()
    }
}
