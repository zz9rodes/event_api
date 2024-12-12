import type { HttpContext } from '@adonisjs/core/http'
import { SuscribersValidation } from '#validators/suscribers'
import SuscribersService from '#services/subcribers_service'
import { inject } from '@adonisjs/core'
import ApiResponse from '../../utils/ApiResponse.js'
import auth from '@adonisjs/auth/services/main'


@inject()
export default class subcribersController {
    constructor(protected SuscribersService: SuscribersService) { }
    async store({ request, response, auth }: HttpContext) {
        try {
            const isAuthenticated = await auth.check()
            const user = auth.user
            if (!isAuthenticated || !user) {
                response.status(401).json(ApiResponse.error(401, "Unauthorize"))
            }


            const payload = await SuscribersValidation.validate(request.body())

            const ResponseData: ApiResponse = await this.SuscribersService.create(payload, user)

            response.status(ResponseData.status).json(ApiResponse.success(201, ResponseData))

        } catch (error) {
            console.log(error);
            response.status(500).json(ApiResponse.error(500, error?.message))
        }

    }

    async getEventSuscription({ params, response }: HttpContext) {

        const eventslug = params.id

        const ResponseData: ApiResponse = await this.SuscribersService.getSubcriptions(eventslug)

        response.status(ResponseData.status).json(ResponseData)

    }

    async getUserSuscription({ params, response, auth }: HttpContext) {

        const isAuthenticated = await auth.check()
        const user = auth.user
        if (!isAuthenticated || !user) {
            response.status(401).json(ApiResponse.error(401, "Unauthorize"))
        }

        const ResponseData: ApiResponse = await this.SuscribersService.getUserSubscriptions(user)

        response.status(ResponseData.status).json(ResponseData)
    }

    async HasSubscribe({ params, response, auth }: HttpContext) {
        const slugEvent = params.id

        const isAuthenticated = await auth.check()
        const user = auth.user
        if (!isAuthenticated || !user) {
            response.status(401).json(ApiResponse.error(401, "Unauthorize"))
        }
        const ResponseData: ApiResponse = await this.SuscribersService.checkUserSubscriptions(slugEvent, user)

        response.status(ResponseData.status).json(ResponseData)
    }


}