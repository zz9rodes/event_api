import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { LoginValidation } from '#validators/auth/login'
import loginService from '#services/auth/login_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '../../../utils/ApiResponse.js'


@inject()
export default class LoginsController {
    constructor(private loginService: loginService) { }
    async login({ request, response }: HttpContext) {
        try {

            const payload = await LoginValidation.validate(request.body())
            const ResponseData: ApiResponse = await this.loginService.login(payload)
            response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
            else{
                response.status(500).json(ApiResponse.error(500,error))
            }
        }
    }
}