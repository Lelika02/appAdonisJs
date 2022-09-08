import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Film from 'App/Models/Film'

export default class FilmsController {

    async index({view}: HttpContextContract){
        const films = await Film.all()
        return view.render('vue/about', {
            films
        });
    }

    async getCreate({view}: HttpContextContract){
        return view.render('vue/create');
    }

    async postCreate({request, response, session}: HttpContextContract){
        const film = new Film()
        film.titre = request.input('titre')
        film.genre = request.input('genre')
        film.description = request.input('description')
        film.auteur = request.input('auteur')
        await film.save()
        session.flash({success: "Le film a bien été sauvegardé"})
        return response.redirect().toRoute('home');
    }

    async getUpdate({params, view}: HttpContextContract){
        const film = await Film.findOrFail(params.id);
        return view.render('vue/update', {
            film
        });
    }

    async postUpdate({params, request, response, session}: HttpContextContract){
        const film = await Film.findOrFail(params.id);
        film
            .merge(request.all())
            .save()
        session.flash({success: "Le film a bien été modifié"})
        return response.redirect().toRoute('home');
    }

    async delete({params, response, session}: HttpContextContract){
        const film = await Film.findOrFail(params.id);
        await film.delete();
        session.flash({success: "Le film a bien été supprimé"})
        return response.redirect().toRoute('home');
    }

}
