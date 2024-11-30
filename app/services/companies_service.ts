import Company from "#models/companies";
import User from "#models/user";
export default class CompanyService {

    async get() {
        return Company.query().select('slug', 'name', 'description')
    }

    async show(companyId: string) {
        return Company.query().select('*').where('slug', companyId)
    }

    async create(payload: any, user: User) {
        try {
            const author = await User.find(user.id)

            if (!author) {
                return { error: 'Author not found' };
            }
            const company = new Company()
            const newCompany: Company | null = await company.fill({ ...payload, userId: author.id, slug: crypto.randomUUID() }).save()
            await newCompany.related('admins').attach([author.id])

            return newCompany
        } catch (error) {
            return error
        }

    }

    async update(data: any, payload: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return { error: 'Company not found' };
            }

            if (company.userId == data.userId) {
                return await company.merge({ ...payload }).save()

            }
            else {
                return { message: "Your are not Authorize " }
            }
        } catch (error) {
            return { error: error.message || 'An error occurred during update' };
        }
    }

    async delete(data: any) {
        try {
            const company = await Company.findBy('slug', data.companyId);
            if (!company) {
                return { error: 'Company not found' };
            }
            if (company.userId == data.userId) {
                return await company.delete()
            }
            else {
                return { message: "Your are not Authorize " }
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
            return company.admins
        } catch (error) {
            return error
        }

    }

    async acceptInvitation(companyId: string, user: User) {

        try {
            const company: Company | null = await Company.findBy('slug', companyId)

            if (!company) {
                return
            }

            const newAdmin = await company.related('admins').attach([user.id])
            return newAdmin
        } catch (error) {
            return { error: error.message }
        }

    }
    async getComanyForOneAdmin(user: User) {

        await user.load('admins');
        return user.admins

    }

}