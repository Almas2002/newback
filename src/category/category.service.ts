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

    async getAllCategories() {
        /*return await this.categoryRepository.createQueryBuilder('categories').
            andWhere('categories.parentCategoryId IS NULL').
        leftJoinAndSelect('categories.parentCategory', 'parentCategory').
        leftJoinAndSelect('categories.subCategories', 'subCategories').
        leftJoinAndSelect('parentCategory.subCategories','secondLevelSub').
        leftJoinAndSelect('parentCategory.parentCategory','secondLevelPar').
        leftJoinAndSelect('secondLevelSub.subCategories','threeLevelSub').
        leftJoinAndSelect('secondLevelSub.parentCategory','threeLevelPar').
        leftJoinAndSelect('secondLevelPar.subCategories','threeLevelSub1').
        leftJoinAndSelect('secondLevelPar.parentCategory','threeLevelPar1').
        getMany()
         */
        const manager = getManager()
        return await manager.getTreeRepository(Category).findTrees()
    }
}
