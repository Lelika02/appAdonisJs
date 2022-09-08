import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class SecurityController {

    async getLogin({view}: HttpContextContract){
        return view.render('vue/login');
    }

    async postLogin({request, auth, response, session}: HttpContextContract){
       const email = request.input('email')
       const password = request.input('password')

       try{
            await auth.use('web').attempt(email, password)
            session.flash({success: "Vous vous êtes bien connecté"})
            response.redirect().toRoute('home')
       }catch {
            session.flash({error: "Identifiant incorrect"})
            response.redirect().toRoute('login')
       }
    }

    async logout({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        response.redirect().toRoute('login')
    }

    async getInscription({view}: HttpContextContract){
        return view.render('vue/inscription');
    }

    async postInscription({request, response, session}: HttpContextContract){
        
        const user = await User.findByOrFail('email', request.input('email'))
        if(user.id == null){
            const utilisateur = new User()
            utilisateur.email = request.input('email')
            utilisateur.password = request.input('password')
            await utilisateur.save()
            session.flash({success: "Vous vous êtes bien inscrit"})
            response.redirect().toRoute('home')
        }else{
            session.flash({error: "Email déja utilisé, veuillez en choisir un autre !"})
            response.redirect().toRoute('inscription')
        }
     }
}
