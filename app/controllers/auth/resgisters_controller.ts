import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { RegisterValidation } from '#validators/auth/resgister'
import RegisterService from '#services/auth/resgister_service'

@inject()
export default class ResgistersController {
    constructor(private RegisterService: RegisterService) { }
    async store({ request,response }: HttpContext) {
        try {

            const payload = await RegisterValidation.validate(request.body())
            return this.RegisterService.Register(payload)
        } catch (error) {
            response.status(error.status).json({ error })
        }
    }
}