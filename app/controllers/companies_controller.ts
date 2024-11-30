import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import { CompanyValidation, UpdateCompanyValidation } from '#validators/companies';
import CompanyService from '#services/companies_service';
import User from '#models/user';

@inject()
export default class CompaniesController {
    constructor(private CompanyService: CompanyService) { }

    async index() {
        return this.CompanyService.get()
    }

    async show({ params }: HttpContext) {
        return this.CompanyService.show(params.id)
    }

    async store({ request, auth }: HttpContext) {

        try {
            const isAuthenticated = auth.check()
            if (!isAuthenticated) {
                return
            }
            const payload = await CompanyValidation.validate(request.body())

            const user = auth.user;

            if (!user) {
                return
            }

            return this.CompanyService.create(payload, user)
        } catch (error) {
            return error
        }
    }

    async update({ request, params, auth }: HttpContext) {
        try {
            const user = auth.user
            if (!user) {
                return
            }


            const data = {
                companyId: params.id,
                userId: user.id
            }
            const payload = await UpdateCompanyValidation.validate(request.body())
            return this.CompanyService.update(data, payload);
        } catch (error) {
            return error
        }
    }

    async destroy({ params, auth }: HttpContext) {
        try {
            const user = auth.user
            if (!user) {
                return
            }

            const data = {
                companyId: params.id,
                userId: user.id
            }
            return this.CompanyService.delete(data);
        } catch (error) {
            return error
        }
    }

    async send({ params }: HttpContext) {
        // "you can send your mail there"
        return { "message": " send" }
    }

    async allAdmin({ params }: HttpContext) {
        const companyId = params.id
        return this.CompanyService.admin(companyId)
    }

    async adminAll({ auth }: HttpContext) {
        try {

            const user = auth.user

            if (!user) {

                return
            }

            return this.CompanyService.getComanyForOneAdmin(user)

        } catch (error) {
            return error
        }

    }


    async accept({ params, auth }: HttpContext) {


        try {
            const companyId = params.id
            const isAuthenticated = await auth.check();

            if (!isAuthenticated) {
                return
            }

            const user = auth.user;

            if (!user) {
                return
            }

            return this.CompanyService.acceptInvitation(companyId, user)
        } catch (error) {
            return error
        }

    }
}