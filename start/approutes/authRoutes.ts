import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const ResgistersController=()=>import  ("#controllers/auth/resgisters_controller");
const LoginsController=()=>import  ("#controllers/auth/logins_controller");
const LogoutsController=()=>import  ("#controllers/auth/logouts_controller");
const UsController=()=>import  ("#controllers/auth/us_controller");

router.group(()=>{
    router.group(()=>{
        router.post('/register',[ResgistersController,'store'])
        router.post('/login',[LoginsController,'login'])
        router.delete('/logout',[LogoutsController,'logout']).use(middleware.auth())
        router.get('/me',[UsController,'me']).use(middleware.auth())

    }).prefix('/auth')
}).prefix('/api')

// export default  AuthRouter
