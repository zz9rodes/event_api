import Company from "#models/companies";
import User from "#models/user";
export default class CompanyService {

    async get() {
        return Company.query().select('slug', 'name', 'description')
    }

    async show(companyId: string) {
        return Company.query().select('*').where('slug', companyId)
    }

    async create(payload: any) {
        try {
            const author = await User.findBy('uuid', payload.userId)

            if (!author) {
                return { error: 'Author not found' };
            }

            const company = new Company()

            const newCompany: Company | null = await company.fill({ ...payload, userId: author.id, slug: crypto.randomUUID() }).save()
            const newAdmin= await newCompany.related('admins').attach([author.id])

            return newCompany
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
            return await company.delete()
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

            const newAdmin = await   company.related('admins').attach([user.id])
            return  newAdmin
        } catch (error) {          
            return { error: error.message }
        }

    }

    // async acceptInvitation(companyId: string, user: User) {
    //     try {
    //         const company: Company | null = await Company.findBy('slug', companyId);
            
    //         if (!company) {
    //             return { error: 'Company not found' }; // Retourne un message d'erreur
    //         }
    
    //         // Vérifie si l'utilisateur existe avant de l'ajouter
    //         const newAdmin: User | null = await company.related('admins').create(user);
    
    //         if (!newAdmin) {
    //             return { error: 'Failed to create admin' }; // Gestion d'erreur si la création échoue
    //         }
    
    //         return newAdmin; // Renvoie directement le nouvel admin sans le sauvegarder à nouveau
    //     } catch (error) {
    //         console.log("ici");
    //         console.log(er);
            
    //         return { error: error.message }; // Retourne un message d'erreur descriptif
    //     }
    // }


}