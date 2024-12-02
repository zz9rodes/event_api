import type { HttpContext } from '@adonisjs/core/http'
import { SuscribersValidation } from '#validators/suscribers'
import SuscribersService from '#services/subcribers_service'
import { inject } from '@adonisjs/core'
import { request } from 'http'


@inject()
export default class subcribersController {
constructor(protected SuscribersService:SuscribersService){}
    async store({request}:HttpContext){
        try {
            const payload= await SuscribersValidation.validate(request.body())

            return this.SuscribersService.create(payload)

        } catch (error) {
            console.log(error);
            return error
        }

    }

    async getEventSuscription({params}:HttpContext){

        const eventslug=params.id

        return  await this.SuscribersService.getSubcriptions(eventslug)

    }

    async getUserSuscription({params}:HttpContext){

        const uuid=params.id

        return  await this.SuscribersService.getUserSubcriptions(uuid)

    }
}