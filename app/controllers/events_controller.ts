import type { HttpContext } from '@adonisjs/core/http'
import { EventValidation, UpdateEventValidation } from '#validators/event'
import EventService from '#services/event_service'
import { inject } from '@adonisjs/core'
import Company from '#models/companies'
import Event from '#models/event'
import { log } from 'console'


@inject()
export default class EventsController {

    constructor(protected EventServie: EventService) { }

    async show({ request, auth, params }: HttpContext) {

        try {

            const companyId = params.id
            const company: Company | null = await Company.findBy('slug', companyId)

            if (!company) {
                return
            }

            return this.EventServie.getCompaniesEvents(company)



        } catch (error) {
            console.log(error);

            return error
        }
    }

    async store({ request, auth, params }: HttpContext) {
        try {
            const companySlug = params.id
            const company = await Company.findBy('slug', companySlug)

            if (!company) {
                return
            }
            const {files,...body}=request.body()
            const payload = await EventValidation.validate(body)

            const user = auth.user

            if (!user) {
                return
            }

            const data = {
                user: user,
                company: company,
                files:files
            }
            return this.EventServie.create(payload, data)

        } catch (error) {
            return error
        }

    }

    async update({ request, auth, params }: HttpContext){

        try {
            
            const eventSlug = params.ide
            
            const event = await Event.findBy('slug', eventSlug)

            if (!event) {
                return
            }

            const {files,...body}=request.body()
            
            // return event
            const payload= await UpdateEventValidation.validate(body)

            const user = auth.user
            
            
            if (!user ) {
                return
            }

            const data = {
                user: user,
                event: event,
                files:files
            }
            return this.EventServie.update(payload, data)
        } catch (error) {
            console.log(error);
            
            return error
        }

    }

    async destroy({params}:HttpContext){
        const eventSlug=params.ide

       return await this.EventServie.delete(eventSlug)
    }

    async get({params}:HttpContext){
        const eventSlug=params.ide

       return await this.EventServie.get(eventSlug)
    }
}