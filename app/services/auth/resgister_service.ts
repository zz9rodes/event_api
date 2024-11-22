import User from "#models/user";

export default class RegisterService {

   async Register(payload:any){
    
     const user=await  User.create(payload)
     return user
    }

}