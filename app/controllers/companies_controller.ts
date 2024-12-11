import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { CompanyValidation, UpdateCompanyValidation } from '#validators/companies';
import CompanyService from '#services/companies_service';
import ApiResponse from '../../utils/ApiResponse.js';
import { errors } from '@vinejs/vine'
import { json } from 'stream/consumers';


@inject()
export default class CompaniesController {
    constructor(private CompanyService: CompanyService) { }

    async index({response}:HttpContext) {
         const ResponseData: ApiResponse=await this.CompanyService.get()
        response.status(ResponseData.status).json(ResponseData)
    }

    async show({ params,response }: HttpContext) {
        const ResponseData :ApiResponse=await this.CompanyService.show(params.id)
        response.status(ResponseData.status).json(ResponseData)
    }

    async store({ request, auth,response }: HttpContext) {

        try {
            const isAuthenticated = auth.check()
            if (!isAuthenticated) {
                response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }
            const payload = await CompanyValidation.validate(request.body())

            const user = auth.user;

            if (!user) {
              return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const ResponseData:ApiResponse=await this.CompanyService.create(payload, user)

            response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
            response.status(500).json(error)
        }
    }

    async update({ request, params, auth,response }: HttpContext) {
        try {
            const user = auth.user
            if (!user) {
                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }


            const data = {
                companyId: params.id,
                userId: user.id
            }
            const payload = await UpdateCompanyValidation.validate(request.body())
            const ResponseData=await this.CompanyService.update(data, payload);
             response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                response.status(422).json(ApiResponse.error(422,error.messages))
            }
            response.status(500).json(error)        
        }
    }

    async destroy({ params, auth,response }: HttpContext) {
        try {
            const user = auth.user
            if (!user) {
                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const data = {
                companyId: params.id,
                userId: user.id
            }
            const ResponseData:ApiResponse=await this.CompanyService.delete(data);

             response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            response.status(500).json(error)       
         }

    }

    async send({ params }: HttpContext) {
        // "you can send your mail there"
        return { "message": " send" }
    }

    async allAdmin({ params,response }: HttpContext) {
        const companyId = params.id
         const ResponseData:ApiResponse=await this.CompanyService.admin(companyId)

        response.status(ResponseData.status).json(ResponseData)
    }

    async adminAll({ auth,response }: HttpContext) {
        try {

            const user = auth.user

            if (!user) {

                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

             const ResponseData: ApiResponse=await this.CompanyService.getComanyForOneAdmin(user)
            response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
          response.status(500).json(error?.message)
        }

    }


    async accept({ params, auth,response }: HttpContext) {


        try {
            const companyId = params.id
            const isAuthenticated = await auth.check();

            if (!isAuthenticated) {
                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const user = auth.user;

            if (!user) {
                return  response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }
             const ResponseData :ApiResponse=await this.CompanyService.acceptInvitation(companyId, user)
             response.status(ResponseData.status).json(ResponseData)
        } catch (error) {
            response.json(ApiResponse.error(500,error?.message))
        }

    }
}