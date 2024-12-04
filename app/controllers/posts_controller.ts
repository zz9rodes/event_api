import type { HttpContext } from '@adonisjs/core/http'
import { PostsValidation } from '#validators/post'
import PostsService from '#services/post_service'
import Event from '#models/event'
import { inject } from '@adonisjs/core'
import ApiResponse from '../../utils/ApiResponse.js'


@inject()
export default class PostsController {
constructor(protected PostsService:PostsService){}
  

    async store({ request, auth, params,response }: HttpContext) {
        try {
            const {files,...body}=request.body()
            const eventSlug = params.ide

            const event = await Event.findBy('slug', eventSlug)

            if (!event) {
                return ApiResponse.error(503,"Event Not found")
            }
            const payload = await PostsValidation.validate(body)

            const user = auth.user


            if (!user) {
                return   response.status(401).json(ApiResponse.error(401,"Unauthorized"))
            }

            const data = {
                user: user,
                event:event,
                files:files
            }

            const ResponseData :ApiResponse=await this.PostsService.create(payload, data)

            response.status(ResponseData.status).json(ResponseData)

        } catch (error) {
            response.status(500).json(ApiResponse.error(500,error.message))
        }

    }

   
    async destroy({params,response}:HttpContext){
        const postSlug=params.id

        const ResponseData: ApiResponse= await this.PostsService.delete(postSlug)
        response.status(ResponseData.status).json(ResponseData)

    }
}