import type { HttpContext } from '@adonisjs/core/http'
import { FileValidation } from '#validators/file'
import { inject } from '@adonisjs/core'

import FileService from '#services/file_service'

@inject()
export default class FilesController {

    constructor(protected FileService: FileService) {

    }

    async store({ request }: HttpContext) {
        try {
            const payload = await FileValidation.validate(request.body())

            return this.FileService.create(payload)

        } catch (error) {

            console.log(error);

            return error
        }


    }

    destroy({ params }: HttpContext) {

        try {
            const fileSlug = params.id

            return this.FileService.delete(fileSlug)
        } catch (error) {
            return error
        }
    }
}