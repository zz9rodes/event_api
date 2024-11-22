


import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LogoutsController {
    async logout({ auth }: HttpContext) {
        try {
            const user = auth.user!
            await User.accessTokens.delete(user, user.currentAccessToken.identifier)
            return { message: 'success'  }
        } catch (error) {
            console.log(error);
            return error
        }
    }
}