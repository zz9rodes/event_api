import type { HttpContext } from '@adonisjs/core/http'
import { EventValidation, UpdateEventValidation } from '#validators/event'
import EventService from '#services/event_service'
import { inject } from '@adonisjs/core'
import Company from '#models/companies'
import Event from '#models/event'
import ApiResponse from '../../utils/ApiResponse.js'
import {errors} from '@vinejs/vine'


@inject()
export default class EventsController {

    constructor(protected EventServie: EventService) { }

    async show({params,response }: HttpContext) {

        try {

            const companyId = params.id
            const company: Company | null = await Company.findBy('slug', companyId)

            if (!company) {
               return response.status(503).json(ApiResponse.error(503,"Company not found"))
            }

             const ResponseData:ApiResponse=await this.EventServie.getCompaniesEvents(company)

             response.status(ResponseData.status).json(ResponseData)
        } catch (error) {

            response.json(ApiResponse.error(500,error?.message))
        }
    }

    async store({ request, auth, params,response }: HttpContext) {
        try {
            const companySlug = params.id
            const company = await Company.findBy('slug', companySlug)

            if (!company) {
                return response.status(503).json(ApiResponse.error(503,"Company not found"))
            }
            const {files,...body}=request.body()
            const payload = await EventValidation.validate(body)

            const user = auth.user

            if (!user) {
              return   response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const data = {
                user: user,
                company: company,
                files:files
            }
            const ResponseData:ApiResponse=await this.EventServie.create(payload, data)

            response.status(ResponseData.status).json(ResponseData)

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
            response.status(500).json(error)
        }

    }

    async update({ request, auth, params,response }: HttpContext){

        try {
            
            const eventSlug = params.ide
            
            const event = await Event.findBy('slug', eventSlug)

            if (!event) {
                return response.status(503).json(ApiResponse.error(503,"Event Not found"))
            }

            const {files,...body}=request.body()
            
            // return event
            const payload= await UpdateEventValidation.validate(body)

            const user = auth.user
            
            
            if (!user ) {
                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const data = {
                user: user,
                event: event,
                files:files
            }
            const ResponseData:ApiResponse=await this.EventServie.update(payload, data)
            response.status(ResponseData.status).json(ResponseData)

        } catch (error) {           
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
            response.status(500).json(error)
        }

    }

    async destroy({params,response}:HttpContext){
        const eventSlug=params.ide

         const ResponseData:ApiResponse= await this.EventServie.delete(eventSlug)

         response.status(ResponseData.status).json(ResponseData)
    }

    async get({params,response}:HttpContext){
        const eventSlug=params.ide

        const ResponseData :ApiResponse= await this.EventServie.get(eventSlug)

        response.status(ResponseData.status).json(ResponseData)
    }
}