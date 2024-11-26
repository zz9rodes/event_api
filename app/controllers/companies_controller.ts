import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { CompanyValidation, UpdateCompanyValidation } from '#validators/companies';
import CompanyService from '#services/companies_service';

@inject()
export default class CompaniesController {
    constructor(private CompanyService: CompanyService) { }

    async index() {
        return this.CompanyService.get()
    }

    async show({ params }: HttpContext) {
        return this.CompanyService.show(params.id)
    }

    async store({ request }: HttpContext) {

        try {
            const payload = await CompanyValidation.validate(request.body())

            return this.CompanyService.create(payload)
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async update({ request, params }: HttpContext) {
        try {
            const payload = await UpdateCompanyValidation.validate(request.body())
            return this.CompanyService.update(params.id, payload);
        } catch (error) {
            return error
        }
    }

    async destroy({ params }: HttpContext) {
        try {
            return this.CompanyService.delete(params.id);
        } catch (error) {
            return error
        }
    }

    async send({ params }: HttpContext){
        // "you can send your mail there"
        return {"message":" send"}
    }

    async allAdmin({params}:HttpContext){
        const companyId=params.id
        return  this.CompanyService.admin(companyId)
    }
}