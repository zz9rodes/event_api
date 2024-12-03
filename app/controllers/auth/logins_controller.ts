import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { LoginValidation } from '#validators/auth/login'
import loginService from '#services/auth/login_service'


@inject()
export default class LoginsController {
    constructor(private loginService: loginService) { }
    async login({ request,  }: HttpContext) {
        try {

            const payload = await LoginValidation.validate(request.body())
            return this.loginService.login(payload)
        } catch (error) {
           
            return error
        }
    }
}