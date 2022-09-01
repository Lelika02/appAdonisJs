import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class FilmsController {

    async index({}: HttpContextContract){
        const user = await User.create({
            email: 'tagatalelika@gmail.com',
            password: 'lelika2002'
        })
    }

   

}
