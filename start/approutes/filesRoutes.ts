import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const FilesController=()=>import  ("#controllers/files_controller");


router.group(()=>{
    router.group(()=>{
        router.post('/create',[FilesController,'store'])
        router.delete('/delete/:id',[FilesController,'destroy']).where('id',router.matchers.uuid())
    }).prefix('/files').use(middleware.auth())
}).prefix('/api')

// export default  AuthRouter
