import Company from "#models/companies";
import User from "#models/user";
import ApiResponse from "../../utils/ApiResponse.js";
export default class CompanyService {

    async get() {
        try {
            const company= await Company.query().select('slug', 'name', 'description')
            return ApiResponse.success(200,company)
        } catch (error) {
            return ApiResponse.error(500,error)

        }
        
    }

    async show(companyId: string) {
        try {
            const company= await Company.query().select('*').where('slug', companyId)
            return ApiResponse.success(200,company)
        } catch (error) {
            return ApiResponse.error(500,error)
        }

    }

    async create(payload: any, user: User) {
        try {

            const company = new Company()
            const newCompany: Company | null = await company.fill({ ...payload, userId: user.id, slug: crypto.randomUUID() }).save()
            await newCompany.related('admins').attach([user.id])

            return ApiResponse.success(201,newCompany)
        } catch (error) {
            return ApiResponse.error(500,error?.message)
        }

    }

    async update(data: any, payload: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return ApiResponse.error(503,"Company not found")
            }

            if (company.userId == data.userId) {
              await company.merge({ ...payload }).save()

              return ApiResponse.success(200,company)
            }
            else {
                return ApiResponse.error(403,"Forbidden")
            }
        } catch (error) {
            return ApiResponse.error(500,error?.message || 'An error occurred during update');
        }
    }

    async delete(data: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return ApiResponse.error(503,"Company not found")
            }
            if (company.userId == data.userId) {
                 await company.delete()

                 return ApiResponse.success(200,null)
            }
            else {
                return ApiResponse.error(403,"Forbidden")
            }
        } catch (error) {
            return ApiResponse.error(500,error|| 'An error occurred during update')
        }
    }

    async admin(companyId: string) {
        try {
            const company: Company | null = await Company.findBy('slug', companyId)

            if (company === null) {
                return ApiResponse.error(503,"Company not found")
            }
            await company.load('admins')
            return ApiResponse.success(200,company) 
        } catch (error) {
            return ApiResponse.error(500,error?.message)
        }

    }

    async acceptInvitation(companyId: string, user: User) {

        try {
            const company: Company | null = await Company.findBy('slug', companyId)

            if (!company) {
                return ApiResponse.error(503,"Company not found")
            }

            const newAdmin = await company.related('admins').attach([user.id])
            return ApiResponse.success(200,newAdmin,`You  accepted to join  ${company.name}`)
        } catch (error) {
            return ApiResponse.error(500,error?.message)
        }

    }
    async getComanyForOneAdmin(user: User) {

        await user.load('admins');
        return ApiResponse.success(200,user)
    }

}