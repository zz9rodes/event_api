import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const CompanyValidation = vine.compile(
    vine.object({
        name: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('companies').select('id').where('name', value)
            return result.length ? false : true
        }),
        description:vine.string().nullable(),
        userId:vine.string().exists(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('uuid', value)
            return result.length>0 ? true : false
        })
    })
)

export const UpdateCompanyValidation = vine.compile(
    vine.object({
        name: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('companies').select('id').where('name', value)
            return result.length ? false : true
        }).optional(),
        description:vine.string().optional(),
        cover:vine.string().url().optional()
    })
)