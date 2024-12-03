import db from "@adonisjs/lucid/services/db";
import Post from "#models/post";
import File from "#models/file";

export default class PostsService {


    async create(payload: any, data: any) {

        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.event.companyId)

            if (!(admin.length == 1)) {
                return
            }


            const post = new Post()

            post.fill({ ...payload, eventId: data.event.id, slug: crypto.randomUUID() })

            await post.save()

            const validFiles: Array<number> = [];

            for (const fileSlug of data.files) {
                let file: File | null = await File.findBy('slug', fileSlug);

                if (file !== null) {
                    validFiles.push(file.id);
                }
            }
            await post.related('files').attach(validFiles);

            return post
            
        } catch (error) {
            console.log(error);
            return error
        }

    }


    async delete(postSlug: string) {
        try {
            const post: Post | null = await Post.findBy('slug', postSlug)

            if (!post) {
                return
            }

            return await post.delete()
        } catch (error) {
            return error
        }

    }


}