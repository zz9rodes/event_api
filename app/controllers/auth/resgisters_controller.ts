import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { RegisterValidation } from '#validators/auth/resgister'
import RegisterService from '#services/auth/resgister_service'
import ApiResponse from '../../../utils/ApiResponse.js'

@inject()
export default class ResgistersController {
    constructor(private RegisterService: RegisterService) { }
    async store({ request ,response}: HttpContext) {
        try {

            const payload = await RegisterValidation.validate(request.body())
            return this.RegisterService.Register(payload)
        } catch (error) {
            return  response.status(error.status).json(ApiResponse.error(error))
        }
    }
}