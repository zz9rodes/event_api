import Event from "#models/event";
import User from "#models/user";
import ApiResponse from "../../utils/ApiResponse.js";

export default class SuscribersService {

    async create(payload: any) {
        try {
            
            console.log(payload);
            
            const event :Event|null= await Event.findBy('slug',payload.event_id)

            const user : User|null= await User.findBy('uuid',payload.user_id)

            if(!event||!user){
                return ApiResponse.error("Something Not found")
            }

           await  event.related('susbcribers').attach([user.id])
            return   ApiResponse.success(true,"User subscribed to event successfully")
        } catch (error) {
            console.log(error);
            
            return ApiResponse.error(error?.message)
        }

    }

    async getSubcriptions(eventslug :string){
        try {
            const event :Event|null= await Event.findBy('slug',eventslug)

            if(!event){
                return ApiResponse.error("Event Not found")
            }

            await event.load('susbcribers')

            return   ApiResponse.success(event)

        } catch (error) {
            return ApiResponse.error(error?.message)
        }
            
    }

    async getUserSubcriptions(uuid :string){
        try {
            const user :User|null= await User.findBy('uuid',uuid)

            if(!user){
                return ApiResponse.error("User Not found")
            }

            await user.load('susbcribers')

            return ApiResponse.success(user)
        } catch (error) {
            return ApiResponse.error(error?.message)
        }
            
    }
}