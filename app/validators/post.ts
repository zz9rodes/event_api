import vine from '@vinejs/vine'

export const PostsValidation = vine.compile(
    vine.object({
        title: vine.string(),
        description:vine.string().optional(),
    })
)