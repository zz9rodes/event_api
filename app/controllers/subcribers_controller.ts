import type { HttpContext } from '@adonisjs/core/http'
import { SuscribersValidation } from '#validators/suscribers'
import SuscribersService from '#services/subcribers_service'
import { inject } from '@adonisjs/core'
import ApiResponse from '../../utils/ApiResponse.js'


@inject()
export default class subcribersController {
constructor(protected SuscribersService:SuscribersService){}
    async store({request,response}:HttpContext){
        try {
            const payload= await SuscribersValidation.validate(request.body())

             const ResponseData :ApiResponse=await this.SuscribersService.create(payload)

             response.status(ResponseData.status).json(ApiResponse.success(201,ResponseData))

        } catch (error) {
            console.log(error);
            response.status(500).json(ApiResponse.error(500,error?.message))
        }

    }

    async getEventSuscription({params,response}:HttpContext){

        const eventslug=params.id

          const ResponseData:ApiResponse =await this.SuscribersService.getSubcriptions(eventslug)

        response.status(ResponseData.status).json(ResponseData)

    }

    async getUserSuscription({params,response}:HttpContext){
        const uuid=params.id
          await this.SuscribersService.getUserSubcriptions(uuid)

        const ResponseData:ApiResponse =await  this.SuscribersService.getUserSubcriptions(uuid)

        response.status(ResponseData.status).json(ResponseData)
    }
}