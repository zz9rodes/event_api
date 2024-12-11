import User from "#models/user";
import ApiResponse from "../../../utils/ApiResponse.js";

export default class RegisterService {

  async Register(payload: any) {
    try {
      const user = new User();
      user.fill({ ...payload, uuid: crypto.randomUUID() });
       await user.save()

       console.log("on est ici");
       console.log(user);
       return  ApiResponse.success(201,user,"Success")
    } catch (error) {
      
      return ApiResponse.error(500,error?.message,null)
    }

  }

}