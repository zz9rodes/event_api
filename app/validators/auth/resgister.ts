import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const RegisterValidation = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length ? false : true
        }),
        password: vine.string().minLength(9),
        firstName: vine.string(),
        lastName: vine.string(),
        avatarUrl: vine.string().trim().nullable(),
        phoneNumber: vine.string().nullable(),
        dob: vine.date().nullable(),
        location: vine.object({
            long: vine.string(),
            lat: vine.string()
        }).nullable()
    })
)