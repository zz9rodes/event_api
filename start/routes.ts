/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import './approutes/authRoutes.js'
import './approutes/categoriesRoutes.js'
import './approutes/companiesRoutes.js'

import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
}).use(middleware.auth())


