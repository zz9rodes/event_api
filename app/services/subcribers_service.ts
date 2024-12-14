import Event from "#models/event";
import ApiResponse from "../../utils/ApiResponse.js";

export default class SuscribersService {

    async create(payload: any, user: any) {
        try {


            console.log(payload);

            const event: Event | null = await Event.findBy('slug', payload.event_id)


            if (!event) {
                return ApiResponse.error(500, "Something Not found")
            }

            await event.related('susbcribers').attach([user.id])
            return ApiResponse.success(200, true, "User subscribed to event successfully")
        } catch (error) {
            console.log(error);

            return ApiResponse.error(500, error?.message)
        }

    }

    async getSubcriptions(eventslug: string) {
        try {
            const event: Event | null = await Event.findBy('slug', eventslug)

            if (!event) {
                return ApiResponse.error(400, "Event Not found")
            }

            await event.load('susbcribers')

            return ApiResponse.success(200, event)

        } catch (error) {
            return ApiResponse.error(500, error?.message)
        }

    }

    async checkUserSubscriptions(slugEvent: string, user: any) {
        try {
            const event = await Event.findBy('slug', slugEvent);

            if (!event) {
                return ApiResponse.error(404, "Event Not found"); // Correction du message d'erreur
            }

            await event.load('susbcribers') // Correction du nom ici
            console.log(event.susbcribers);

            // Utilisez `some` pour vérifier si l'utilisateur est abonné
            const isSubscribed = event.susbcribers.some(subscriber => {
                return subscriber.email === user.email; // Vérification correcte
            });

            return ApiResponse.success(200, isSubscribed); // Renvoie le résultat de la vérification
        } catch (error) {
            console.log(error);
            return ApiResponse.error(500, error?.message);
        }
    }

    async getUserSubscriptions(user:any) {

        try {
            user.related('susbcribers')

            await user.load('susbcribers')

            await Promise.all(user.susbcribers.map(async (event :Event) => {
                await event.load('files');
            }));

            return ApiResponse.success(200, user);
        } catch (error) {
            return ApiResponse.error(500, error?.message);

        }

    }
}