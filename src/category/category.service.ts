import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {getManager, Repository} from "typeorm";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    }


    async addCategory(dto: CreateCategoryDto) {
            const category = await this.categoryRepository.findOne({where:{id:dto.parentCategoryId}})
            return  await this.categoryRepository.save({name:dto.name,parent:category})
    }
    async getCategoryById(id:number){
        return await this.categoryRepository.findOne({where:{id},relations:['specs','specs.values']})
    }

    async getAllCategories() {
        const manager = getManager()
        return await manager.getTreeRepository(Category).findTrees()
    }
}
