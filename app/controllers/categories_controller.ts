import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core';
import CategoryService from "#services/categories_service";
import { CategoryValidation, UpdateCategoryValidation } from '#validators/categories';
import ApiResponse from '../../utils/ApiResponse.js';
import { errors } from '@vinejs/vine'

@inject()
export default class CategoriesController {
    constructor(private CategoryService: CategoryService) { }
    async index({ response }: HttpContext) {
        const ResposeData: ApiResponse = await this.CategoryService.get()

        response
            .status(ResposeData.status)
            .json(ResposeData)
    }



    async store({ request, response }: HttpContext) {
        try {
            const payload = await CategoryValidation.validate(request.body())

            const ResposeData = await this.CategoryService.create(payload)

            response
                .status(ResposeData.status)
                .json(ResposeData)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(442).json(ApiResponse.error(442,error.messages))
            }
            response.status(500).json(error)
        }
    }
    async update({ request, params, response }: HttpContext){
            try {
                const payload = await UpdateCategoryValidation.validate(request.body())
                const ResposeData = await this.CategoryService.update(params.id, payload);
                response
                    .status(ResposeData.status)
                    .json(ResposeData)
            } catch (error) {
                if (error instanceof errors.E_VALIDATION_ERROR) {
                    response.status(442).json(ApiResponse.error(442,error.messages))
                }
                response.status(500).json(error)
            }
        }

    async destroy({ params, response }: HttpContext){
            try {
                const ResposeData = await this.CategoryService.delete(params.id);
                response
                    .status(ResposeData.status)
                    .json(ResposeData)
            } catch (error) {
                response
                    .status(500)
                    .json(ApiResponse.error(500,error?.message))
            }
        }
    }
