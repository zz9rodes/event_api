import type { HttpContext } from '@adonisjs/core/http'
import { PostsValidation } from '#validators/post'
import PostsService from '#services/post_service'
import Event from '#models/event'
import { inject } from '@adonisjs/core'


@inject()
export default class PostsController {
constructor(protected PostsService:PostsService){}
    // async stores({request}:HttpContext){

    //     try {
    //         const {files,...body}=request.body()

    //         return 
    //     } catch (error) {
    //         return error
    //     }

    // }

    async store({ request, auth, params }: HttpContext) {
        try {
            const {files,...body}=request.body()
            const eventSlug = params.ide

            const event = await Event.findBy('slug', eventSlug)

            if (!event) {
                return
            }
            const payload = await PostsValidation.validate(body)

            const user = auth.user


            if (!user) {
                return
            }

            const data = {
                user: user,
                event:event
            }

            return this.PostsService.create(payload, data)

        } catch (error) {
            return error
        }

    }

   
    async destroy({params}:HttpContext){
        const postSlug=params.id

       return await this.PostsService.delete(postSlug)

    }
}