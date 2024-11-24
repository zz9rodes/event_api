import Company from "#models/companies";
import User from "#models/user";
export default class CompanyService {

    async get() {
        return Company.query().select('slug', 'name', 'description')
    }

    async show(companyId :string){
        return Company.query().select('*').where('slug',companyId)
    }

    async create(payload: any) {
        try {
            const author = await User.findBy('uuid', payload.userId)

            if (!author) {
                return { error: 'Author not found' };
            }

            const company = new Company()

            company.fill({ ...payload, userId: author.id, slug: crypto.randomUUID() })
            return await company.save()
        } catch (error) {
            return error
        }

    }

    async update(companyId: string, payload: any) {
        try {
            const company = await Company.findBy('slug', companyId);
            if (!company) {
                return { error: 'Company not found' };
            }
            return await company.merge({ ...payload }).save()
        } catch (error) {
            return { error: error.message || 'An error occurred during update' };
        }
    }

    async delete(companyId: string) {
        try {
            const company = await Company.findBy('slug', companyId);
            if (!company) {
                return { error: 'Company not found' };
            }
            return await  company.delete()
        } catch (error) {
            return { error: error.message || 'An error occurred during delete' };
        }
    }


}