import db from "@adonisjs/lucid/services/db";
import Post from "#models/post";
import File from "#models/file";
import ApiResponse from "../../utils/ApiResponse.js";

export default class PostsService {


    async create(payload: any, data: any) {

        try {
            const admin = await db.from('admins')
                .where('user_id', data.user.id)
                .where('company_id', data.event.companyId)

            if (!(admin.length == 1)) {
                return ApiResponse.error(500,"Somethings Wen Rong")
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

            return ApiResponse.success(201,post)
            
        } catch (error) {
            console.log(error);
            return ApiResponse.error(500,error?.message)
        }

    }


    async delete(postSlug: string) {
        try {
            const post: Post | null = await Post.findBy('slug', postSlug)

            if (!post) {
                return ApiResponse.error(503,"Post Not found")
            }

            await post.delete()

            return ApiResponse.success(200,null)
        } catch (error) {
            return ApiResponse.error(500,error?.message)
        }

    }


}