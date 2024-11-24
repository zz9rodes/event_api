import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';

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

      return await User.query()
        .where('id', user.id)
        .preload('company')
        .firstOrFail();

    } catch (error) {
      console.log(error);
      return error
    }

  }

}