import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core';
import CategoryService from "#services/category_service";
import { CategoryValidation, UpdateCategoryValidation} from '#validators/category';
import { request } from 'http';

@inject()
export default class CategoriesController {
    constructor(private CategoryService: CategoryService) { }
    async index() {
        return this.CategoryService.get()
    }

    async store({ request }: HttpContext) {
        try {
            const payload = await CategoryValidation.validate(request.body())

            return this.CategoryService.create(payload)

        } catch (error) {
            return error
        }
    }

    async update({request,params}:HttpContext){
        try {
            const payload =await UpdateCategoryValidation.validate(request.body())
         return   this.CategoryService.update(params.id,payload);
        } catch (error) {
            return error
        }
    }

    async destroy({params}:HttpContext){
        try {
         return   this.CategoryService.delete(params.id);
        } catch (error) {
            return error
        }
    }
}