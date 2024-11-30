import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const LoginValidation = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length >0 ? true : false
        }),
        password: vine.string()
    })
)