import Company from "#models/companies";
import User from "#models/user";
import ApiResponse from "../../utils/ApiResponse.js";
export default class CompanyService {

    async get() {
         const company= await Company.query().select('slug', 'name', 'description')
         return ApiResponse.success(company)
    }

    async show(companyId: string) {
        const company= await Company.query().select('*').where('slug', companyId)
        return ApiResponse.success(company)
    }

    async create(payload: any, user: User) {
        try {
            const author = await User.find(user.id)

            if (!author) {
               return ApiResponse.error("Author Not Found")
            }
            const company = new Company()
            const newCompany: Company | null = await company.fill({ ...payload, userId: author.id, slug: crypto.randomUUID() }).save()
            await newCompany.related('admins').attach([author.id])

            return ApiResponse.success(newCompany)
        } catch (error) {
            return ApiResponse.success(error?.message)
        }

    }

    async update(data: any, payload: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return ApiResponse.error("Company not found")
            }

            if (company.userId == data.userId) {
              await company.merge({ ...payload }).save()

              return ApiResponse.success(company)
            }
            else {
                return ApiResponse.error("Your are not Authorize")
            }
        } catch (error) {
            return ApiResponse.error(error?.message || 'An error occurred during update');
        }
    }

    async delete(data: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return ApiResponse.error("Company not found")
            }
            if (company.userId == data.userId) {
                 await company.delete()

                 return ApiResponse.success(null)
            }
            else {
                return ApiResponse.error("Your are not Authorize")
            }
        } catch (error) {
            return { error: error.message || 'An error occurred during delete' };
        }
    }

    async admin(companyId: string) {
        try {
            const company: Company | null = await Company.findBy('slug', companyId)

            if (company === null) {
                return { "message": "Company Not found" }
            }
            await company.load('admins')
            return ApiResponse.success(company) 
        } catch (error) {
            return ApiResponse.error(error?.message)
        }

    }

    async acceptInvitation(companyId: string, user: User) {

        try {
            const company: Company | null = await Company.findBy('slug', companyId)

            if (!company) {
                return
            }

            const newAdmin = await company.related('admins').attach([user.id])
            return ApiResponse.success(newAdmin,`You have just accepted the invitation of the company ${company.name}`)
        } catch (error) {
            return ApiResponse.error(error?.message)
        }

    }
    async getComanyForOneAdmin(user: User) {

        await user.load('admins');
        return ApiResponse.success(user)

    }

}