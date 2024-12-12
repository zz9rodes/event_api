import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const CompanyValidation = vine.compile(
    vine.object({
        name: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('companies').select('id').where('name', value)
            return result.length>0 ? false : true
        }),
        description:vine.string().nullable(),
        cover:vine.string().url().optional()
    })
)

export const UpdateCompanyValidation = vine.compile(
    vine.object({
        name: vine.string().optional(),
        description:vine.string().optional(),
        cover:vine.string().url().optional()
    })
)