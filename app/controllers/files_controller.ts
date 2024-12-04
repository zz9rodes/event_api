import type { HttpContext } from '@adonisjs/core/http'
import { FileValidation } from '#validators/file'
import { inject } from '@adonisjs/core'
import ApiResponse from '../../utils/ApiResponse.js'

import FileService from '#services/file_service'

@inject()
export default class FilesController {

    constructor(protected FileService: FileService) {

    }

    async store({ request,response }: HttpContext) {
        try {
            const payload = await FileValidation.validate(request.body())

          const ResponseData :ApiResponse=await this.FileService.create(payload)

          response.status(ResponseData.status).json(ResponseData)

        } catch (error) {

            console.log(error);

            return response.status(500).json(ApiResponse.error(500,error?.message))
        }


    }

   async destroy({ params,response }: HttpContext) {

        try {
            const fileSlug = params.id

             const ResponseData=await this.FileService.delete(fileSlug)

             response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            return response.status(500).json(ApiResponse.error(500,error?.message))
        }
    }
}