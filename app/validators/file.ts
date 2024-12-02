import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const FileValidation = vine.compile(
    vine.object({
        url: vine.string().url().unique(async (db: Database, value: string) => {
            const result = await db.from('files').select('id').where('url', value)
            return result.length>0 ? false : true
        }),
        title:vine.string(),
        type:vine.string(),
    })
)