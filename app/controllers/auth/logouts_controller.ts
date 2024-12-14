
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import ApiResponse from '../../../utils/ApiResponse.js'

export default class LogoutsController {
    async logout({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            await User.accessTokens.delete(user, user.currentAccessToken.identifier)
            const ResposeData = ApiResponse.success(0, "Success")

            response.status(200).json(ResposeData)
        } catch (error) {
            console.log(error);
            const ResposeData = ApiResponse.error(0,error?.message)

            response.status(500).json(ResposeData)
        }
    }
}