import User from "#models/user";

export default class RegisterService {

  async Register(payload: any) {
    try {
      const user = new User();
      user.fill({ ...payload, uuid: crypto.randomUUID() });
      return await user.save()
    } catch (error) {
      return error
    }

  }

}