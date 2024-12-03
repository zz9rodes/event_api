
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import ApiResponse from '../../../utils/ApiResponse.js'

export default class LogoutsController {
    async logout({ auth }: HttpContext) {
        try {
            const user = auth.user!
             await User.accessTokens.delete(user, user.currentAccessToken.identifier)
            return ApiResponse.success(null,"Success")
        } catch (error) {
            console.log(error);
            return ApiResponse.error(error?.message,null)
        }
    }
}