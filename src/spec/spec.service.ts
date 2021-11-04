import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Spec} from "./spec.entity";
import {Repository} from "typeorm";
import {SpecValues} from "./spec-values.entity";
import {CreateSpecDto} from "./dto/create-spec.dto";
import {CreateSpecValueDto} from "./dto/create-spec-value.dto";
import {CategoryService} from "../category/category.service";
import {AddCategoryToSpecDto} from "./dto/add-category-to-spec.dto";
import {AddSpecToProductDto} from "./dto/add-spec-to-product.dto";
import {ProductService} from "../product/product.service";

@Injectable()
export class SpecService {
    constructor(@InjectRepository(Spec) private specRepository: Repository<Spec>,
                @InjectRepository(SpecValues) private specValuesRepository: Repository<SpecValues>,
                private categoryService: CategoryService, private productService: ProductService
    ) {
    }

    async createSpec(dto: CreateSpecDto) {
        return await this.specRepository.save(dto)
    }

    async createSpecValue(dto: CreateSpecValueDto) {
        return await this.specValuesRepository.save({...dto, title: {id: dto.titleId}})
    }

    async getSpec() {
        return await this.specRepository.find({relations: ["values", "categories", "values.products"]})
    }

    async addCategoryForSpec(dto: AddCategoryToSpecDto) {
        const {spec, category} = await this.workWithSpecCategory(dto)
        spec.categories = [...spec.categories, category]
        await this.specRepository.save(spec)
        return spec
    }

    async deleteCategorySpec(dto: AddCategoryToSpecDto) {
        const {spec, category} = await this.workWithSpecCategory(dto)
        spec.categories = spec.categories.filter(item => item.name !== category.name)
        await this.specRepository.save(spec)
        return spec
    }

    async getSpecWithCategory(categoryId) {
        const category = await this.categoryService.getCategoryById(categoryId)
        return category.specs
    }

    async addSpecToProduct(dto: AddSpecToProductDto) {
        const {spec, product} = await this.workWithSpecProduct(dto)
        spec.products = [...spec.products, product]
        return await this.specValuesRepository.save(spec)
    }

    async deleteSpecInProduct(dto: AddSpecToProductDto) {
        const {spec, product} = await this.workWithSpecProduct(dto)
        spec.products = spec.products.filter(item => item.name !== product.name)
        return await this.specValuesRepository.save(spec)
    }

    private async workWithSpecProduct(dto: AddSpecToProductDto) {
        const product = await this.productService.getProductById(dto.productId)
        const spec = await this.specValuesRepository.findOne({where: {id: dto.specValueId}, relations: ["products"]})
        if (!product || !spec) {
            throw new HttpException("товар или харектеристика не найдено", HttpStatus.BAD_REQUEST)
        }
        return {
            product,
            spec
        }
    }

    private async workWithSpecCategory(dto: AddCategoryToSpecDto) {
        const category = await this.categoryService.getCategoryById(dto.categoryId)
        const spec = await this.specRepository.findOne({where: {id: dto.specId}, relations: ["categories"]})
        if (!spec || !category) {
            throw new HttpException("категория или спецификация не найдено", HttpStatus.BAD_REQUEST)
        }
        return {
            category,
            spec
        }
    }


}
