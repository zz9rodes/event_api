import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const subcribersController=()=>import  ("#controllers/subcribers_controller");


router.group(()=>{
    router.group(()=>{
        router.post('/create',[subcribersController,'store'])
        router.get('/event/:id/get',[subcribersController,'getEventSuscription']).where('id',router.matchers.uuid())
        router.get('/user/:id/get',[subcribersController,'getUserSuscription']).where('id',router.matchers.uuid())


        // router.delete('/delete/:id',[subcribersController,'destroy']).where('id',router.matchers.uuid())
    }).prefix('/susbscribers').use(middleware.auth())
}).prefix('/api')

// export default  AuthRouter
