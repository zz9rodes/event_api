import User from "#models/user";
import ApiResponse from "../../../utils/ApiResponse.js";

export default class RegisterService {

  async Register(payload: any) {
    try {
      const user = new User();
      user.fill({ ...payload, uuid: crypto.randomUUID() });
       await user.save()

       return  ApiResponse.success(204,user,"Success")
    } catch (error) {
      
      return ApiResponse.error(500,error?.message,null)
    }

  }

}