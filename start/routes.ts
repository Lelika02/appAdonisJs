/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/getCreate', 'FilmsController.getCreate').as('create');
    Route.post('/postCreate', 'FilmsController.postCreate');
    Route.get('/getUpdate/:id', 'FilmsController.getUpdate').as('update');
    Route.post('/postUpdate/:id', 'FilmsController.postUpdate');
    Route.get('/delete/:id', 'FilmsController.delete').as('delete');
}).middleware('auth')

Route.get('/', 'FilmsController.index').as('home');
Route.get('/getLogin', 'SecurityController.getLogin').as('login');
Route.post('/postLogin', 'SecurityController.postLogin');
Route.get('/getInscription', 'SecurityController.getInscription').as('inscription');
Route.post('/postInscription', 'SecurityController.postInscription');
Route.get('/logout', 'SecurityController.logout').as('logout');
