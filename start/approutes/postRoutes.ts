import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const PostsController=()=>import  ("#controllers/posts_controller");


router.group(()=>{
    router.group(()=>{
        
        router.post('/create',[PostsController,'store'])
        router.delete('/:id/delete',[PostsController,'destroy']).where('id',router.matchers.uuid())
    }).prefix('/event/:ide/post').use(middleware.auth()).where('ide',router.matchers.uuid())
}).prefix('/api')

// export default  AuthRouter
