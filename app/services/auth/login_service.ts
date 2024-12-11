import User from "#models/user"
import ApiResponse from "../../../utils/ApiResponse.js"

export default class loginService {
    async login(payload: any) {
        try {
            const user = await User.verifyCredentials(payload.email, payload.password)

           const token=  await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

             return ApiResponse.success(200,token,"Successfully Login")
        } catch (error) {
            return  ApiResponse.error(400,error?.message)
        }

    }

}