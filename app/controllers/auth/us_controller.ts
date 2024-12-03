import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';
import ApiResponse from '../../../utils/ApiResponse.js';

export default class UsController {

  async me({ auth }: HttpContext) {
    try {

      const isAuthenticated = await auth.check();

      if (!isAuthenticated) {
        return
      }

      const user = auth.user;

      if (!user) {
        return
      }

      const CurrentUser = await User.find(user.id)
      await CurrentUser?.load('company')

      return ApiResponse.success(CurrentUser, "Success")

    } catch (error) {
      console.log(error);
      return ApiResponse.error(error?.message)
    }

  }

}