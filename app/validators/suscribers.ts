import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const SuscribersValidation = vine.compile(
    vine.object({
        event_id: vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('events').select('id').where('slug', value)
            return result.length>0 ? true : false
        }),
        user_id:vine.string().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('uuid', value)
            return result.length>0 ? true : false
        })
    })
)