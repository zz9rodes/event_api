import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core';
import CategoryService from "#services/categories_service";
import { CategoryValidation, UpdateCategoryValidation} from '#validators/categories';
import ApiResponse from '../../utils/ApiResponse.js';

@inject()
export default class CategoriesController {
    constructor(private CategoryService: CategoryService) { }
    async index() {
        return await this.CategoryService.get()
    }



    async store({ request }: HttpContext) {
        try {
            const payload = await CategoryValidation.validate(request.body())

            return this.CategoryService.create(payload)

        } catch (error) {
            return ApiResponse.error(error?.message)
        }
    }

    async update({request,params}:HttpContext){
        try {
            const payload =await UpdateCategoryValidation.validate(request.body())
         return   this.CategoryService.update(params.id,payload);
        } catch (error) {
            return ApiResponse.error(error?.message)
        }
    }

    async destroy({params}:HttpContext){
        try {
         return   this.CategoryService.delete(params.id);
        } catch (error) {
            return ApiResponse.error(error?.message)
        }
    }
}