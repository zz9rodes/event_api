import router from "@adonisjs/core/services/router";
const CategoriesController = () => import("#controllers/categories_controller");
const EventsController = () => import("#controllers/events_controller");

import { middleware } from "#start/kernel";

router.group(() => {

    router.group(()=>{
        router.group(() => {
       
            router.post('/create', [EventsController, 'store'])
    
            router.get('/', [EventsController, 'show'])

            router.get('/:ide/get', [EventsController, 'get']).where('ide',router.matchers.uuid())

    
            router.put('/:ide/update', [EventsController, 'update']).where('ide',router.matchers.uuid())
    
            router.delete(':ide/delete', [EventsController, 'destroy']).where('ide',router.matchers.uuid())
    
    
        }).prefix('/event').use(middleware.auth())
    }).prefix('/company/:id').where('id',router.matchers.uuid())

}).prefix('/api')