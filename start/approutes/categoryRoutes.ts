import router from "@adonisjs/core/services/router";
const CategoriesController = () => import("#controllers/categories_controller");
import { middleware } from "#start/kernel";

router.group(() => {
    
    router.group(() => {
        router.get('/', [CategoriesController, 'index'])

        router.post('/create', [CategoriesController, 'store'])

        router.put('/update/:id', [CategoriesController, 'update']).where('id',router.matchers.uuid())

        router.delete('/delete/:id', [CategoriesController, 'destroy']).where('id',router.matchers.uuid())

    
    }).prefix('/category').use(middleware.auth())

}).prefix('/api')