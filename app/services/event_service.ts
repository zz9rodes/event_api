import db from "@adonisjs/lucid/services/db";
import Event from "#models/event";
import Company from "#models/companies";
import File from "#models/file";
import ApiResponse from "../../utils/ApiResponse.js";

export default class EventService {

    async getCompaniesEvents(company: Company) {

        await company.load('events')

        return ApiResponse.success(company)
    }

    async create(payload: any, data: any) {

        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.company.id)

            if (!(admin.length == 1)) {
                return ApiResponse.error("Something when Rong")
            }


            const event = new Event()

            event.fill({ ...payload, companyId: admin[0].company_id, slug: crypto.randomUUID() })
            await event.save()

            const validFiles: Array<number> = [];

            for (const fileSlug of data.files) {
                let file: File | null = await File.findBy('slug', fileSlug);

                if (file !== null) {
                    validFiles.push(file.id);
                }
            }
            await event.related('files').attach(validFiles);

            return ApiResponse.success(event)
        } catch (error) {
            console.log(error);
            return ApiResponse.error(error?.message)
        }

    }

    async update(payload: any, data: any) {
        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.event.companyId)

            if (!(admin.length == 1)) {
                return ApiResponse.error("Something when Rong")
            }


            const event = data.event

            await event.merge({ ...payload }).save()


            const validFiles: Array<number> = [];

            for (const fileSlug of data.files) {
                let file: File | null = await File.findBy('slug', fileSlug);

                if (file !== null) {
                    validFiles.push(file.id);
                }
            }
            await event.related('files').attach(validFiles);
            return  ApiResponse.success(event)
        } catch (error) {
            return ApiResponse.error(error?.message)
        }
    }

    async delete(eventSlug: string) {
        try {
            const event: Event | null = await Event.findBy('slug', eventSlug)

            if (!event) {
                return ApiResponse.error("Event Not found")
            }

             await event.delete()

             return ApiResponse.success(null)
        } catch (error) {
            return ApiResponse.error(error?.message)
        }

    }

    async get(eventSlug: string) {
        try {
            const event: Event | null = await Event.findBy('slug', eventSlug)

            if (!event) {
                return ApiResponse.error("Event Not found")
            }

            return ApiResponse.success(event) 
        } catch (error) {
            return ApiResponse.error(error?.message)
        }

    }
}