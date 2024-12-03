import type { HttpContext } from '@adonisjs/core/http'
import { PostsValidation } from '#validators/post'
import PostsService from '#services/post_service'
import Event from '#models/event'
import { inject } from '@adonisjs/core'
import ApiResponse from '../../utils/ApiResponse.js'


@inject()
export default class PostsController {
constructor(protected PostsService:PostsService){}
  

    async store({ request, auth, params }: HttpContext) {
        try {
            const {files,...body}=request.body()
            const eventSlug = params.ide

            const event = await Event.findBy('slug', eventSlug)

            if (!event) {
                return ApiResponse.error("Event Not found")
            }
            const payload = await PostsValidation.validate(body)

            const user = auth.user


            if (!user) {
                return ApiResponse.error("Your are Not Login")
            }

            const data = {
                user: user,
                event:event,
                files:files
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