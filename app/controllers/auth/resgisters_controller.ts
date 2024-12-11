import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { RegisterValidation } from '#validators/auth/resgister'
import RegisterService from '#services/auth/resgister_service'
import ApiResponse from '../../../utils/ApiResponse.js'
import {errors} from '@vinejs/vine'

@inject()
export default class ResgistersController {
    constructor(private RegisterService: RegisterService) { }
    async store({ request ,response}: HttpContext) {
        try {

            const payload = await RegisterValidation.validate(request.body())
            const  ResponseData :ApiResponse= await this.RegisterService.Register(payload)
            response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            console.log(error);
            
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
           else {
            response.status(500).json(ApiResponse.error(500, 'Erreur interne du serveur'))
         }
        }
    }
}