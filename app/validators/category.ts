import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const CategoryValidation = vine.compile(
    vine.object({
        name: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('categories').select('id').where('name', value)
            return result.length ? false : true
        }),
        is_active:vine.boolean().optional().nullable()
    })
)

export const UpdateCategoryValidation = vine.compile(
    vine.object({
        name: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('categories').select('id').where('name', value)
            return result.length ? false : true
        }).optional(),
        is_active:vine.boolean().optional()
    })
)