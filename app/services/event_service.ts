import db from "@adonisjs/lucid/services/db";
import Event from "#models/event";
import Company from "#models/companies";

export default class EventService {

    async getCompaniesEvents(company: Company) {

        await company.load('events')

        return company
    }

    async create(payload: any, data: any) {

        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.company.id)

            if (!(admin.length == 1)) {
                return
            }

            console.log(admin[0].company_id);

            const event = new Event()

            event.fill({ ...payload, companyId: admin[0].company_id, slug: crypto.randomUUID() })

            return await event.save()
        } catch (error) {
            console.log(error);
            return error
        }

    }

    async update(payload: any, data: any) {
        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.event.companyId)

            if (!(admin.length == 1)) {
                return
            }


            const event = data.event

            return await event.merge({ ...payload }).save()
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async delete(eventSlug: string) {
        try {
            const event: Event | null = await Event.findBy('slug', eventSlug)

            if (!event) {
                return
            }

            return await event.delete()
        } catch (error) {
            return error
        }

    }

    async get(eventSlug: string) {
        try {
            const event: Event | null = await Event.findBy('slug', eventSlug)

            if (!event) {
                return
            }

            return  event
        } catch (error) {
            return error
        }

    }
}