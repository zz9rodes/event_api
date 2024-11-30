import router from "@adonisjs/core/services/router";
const CompaniesController= () => import("#controllers/companies_controller")
import { middleware } from "#start/kernel";

router.group(() => {
    
    router.group(() => {
        router.get('/', [CompaniesController, 'index'])

        router.get('/:id', [CompaniesController, 'show']).where('id',router.matchers.uuid())

        router.post('/create', [CompaniesController, 'store'])

        router.put('/update/:id', [CompaniesController, 'update']).where('id',router.matchers.uuid())

        router.delete('/delete/:id', [CompaniesController, 'destroy']).where('id',router.matchers.uuid())

        router.group(()=>{
            router.post('/:id/send', [CompaniesController, 'send']).where('id',router.matchers.uuid())
            router.get('/:id/admin', [CompaniesController, 'allAdmin']).where('id',router.matchers.uuid())
            router.post('/:id/accept', [CompaniesController, 'accept']).where('id',router.matchers.uuid())

        }).prefix('/invitation')

    }).prefix('/company').use(middleware.auth())

}).prefix('/api')