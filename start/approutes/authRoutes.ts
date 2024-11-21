import router from "@adonisjs/core/services/router";
import ResgistersController from "#controllers/auth/resgisters_controller";
router.group(()=>{
    router.group(()=>{
        router.post('/register',[ResgistersController,'store'])
    }).prefix('/auth')
}).prefix('/api')