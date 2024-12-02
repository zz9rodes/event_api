import vine from '@vinejs/vine'

export const EventValidation = vine.compile(
    vine.object({
        name: vine.string(),
        description:vine.string(),
        price:vine.number().min(100),
        places:vine.number(),
        location:vine.object({
            lon:vine.string(),
            lat:vine.string()
        }).optional().nullable(),
        active:vine.boolean(),
        date_time:vine.date().after('today'),
        duration:vine.string().maxLength(10)
        // company:vine.string(),
    })
)

export const UpdateEventValidation = vine.compile(
    vine.object({
        name: vine.string().optional(),
        description:vine.string().optional(),
        price:vine.number().min(100).optional().optional(),
        places:vine.number().optional().optional(),
        location:vine.object({
            lon:vine.string(),
            lat:vine.string()
        }).optional().nullable(),
        active:vine.boolean().optional(),
        date_time:vine.date().after('today').optional(),
        duration:vine.string().maxLength(10).optional()
    })
)
