import User from "#models/user"

export default class loginService {
    async login(payload: any) {
        try {
            const user = await User.verifyCredentials(payload.email, payload.password)

            return User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })
        } catch (error) {
            return error
        }

    }

}