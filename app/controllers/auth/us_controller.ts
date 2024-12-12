import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';
import ApiResponse from '../../../utils/ApiResponse.js';

export default class UsController {

  async me({ auth ,response}: HttpContext) {
    try {

      const isAuthenticated = await auth.check();

      if (!isAuthenticated) {
        return response
          .status(401)
          .json(ApiResponse.error(401,"Unauthorized", null))
      }

      const user = auth.user;

      if (!user) {
       return  response
        .status(401)
        .json(ApiResponse.error(401,"Unauthorized", null))
      }

      const CurrentUser = await User.find(user.id)
      await CurrentUser?.load('company')

       ApiResponse.success(200,CurrentUser, "Success")
      response
      .status(200)
      .json(ApiResponse.success(200,CurrentUser, "Success"))

    } catch (error) {
      const ResposeData = ApiResponse.error(500,error?.message, null)

      response
        .status(500)
        .json(ResposeData)
    }

  }

}