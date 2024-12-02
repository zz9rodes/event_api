import Event from "#models/event";
import User from "#models/user";

export default class SuscribersService {

    async create(payload: any) {
        try {
            
            console.log(payload);
            
            const event :Event|null= await Event.findBy('slug',payload.event_id)

            const user : User|null= await User.findBy('uuid',payload.user_id)

            if(!event||!user){
                return
            }

           await  event.related('susbcribers').attach([user.id])
            return { message: 'User subscribed to event successfully' };
        } catch (error) {
            console.log(error);
            
            return error
        }

    }

    async getSubcriptions(eventslug :string){
        try {
            const event :Event|null= await Event.findBy('slug',eventslug)

            if(!event){
                return
            }

            await event.load('susbcribers')

            return event
        } catch (error) {
            return error
        }
            
    }

    async getUserSubcriptions(uuid :string){
        try {
            const user :User|null= await User.findBy('uuid',uuid)

            if(!user){
                return
            }

            await user.load('susbcribers')

            return user
        } catch (error) {
            return error
        }
            
    }
}