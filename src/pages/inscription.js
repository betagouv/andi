import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const FormPage = () => (
    <Layout>
      <section>
        <div className="row formrow">
          <div className="section pane leftpane">
            <div>
              <Link to="/" style={{color: '#fff'}}>Accueil</Link> / Inscription
            </div>
            <h1>Inscrivez-vous pour participer à l'aventure</h1>
            <p>Ce projet est expérimental. Il se construit pour vous et avec vous. Chacun est libre d’y participer et de l’arrêter quand il le souhaite.</p>
            <h4>Cette expérimentation est faite pour vous si vous souhaitez :</h4>
            <ul>
              <li>Découvrir un métier ou un secteur d'activité</li>
              <li>Confirmer votre projet professionnel</li>
              <li>Initier une démarche de recrutement avec un employeur</li>
            </ul>
            <h4>Comment ça se passe concrètement :</h4>
            <p>Vous êtes accompagné pendant 1 à 2 mois par notre équipe.</p>
            <p>Durant cette période nous travaillons avec vous pour définir au mieux votre projet professionnel.</p>
            <p>Nous vous aidons ensuite à trouver une entreprise adaptée à votre projet et prête à vous accueillir en immersion.</p>
            <p>Nous examinons ensemble les difficultés que vous rencontrez au cours de cette immersion et nous vous proposons des solutions pour les régler.</p>
            <p>Nous faisons un bilan à la fin de la période d’immersion et nous vous aidons à prendre la direction que vous avez choisi.</p>
          </div>
          <div className="section pane section-grey">
            <form action="https://formkeep.com/f/a7a5b70426bc" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
              <div className="form__group">
                <label htmlFor="prenom">Prénom</label>
                <input name="prenom" id="prenom" type="text" required="true" />
              </div>
              <div className="form__group">
                <label htmlFor="nom">Nom</label>
                <input name="nom" id="nom" type="text" required="true" />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" required="true" />
              </div>
              <input type="submit" className="button" value="Envoyer ma réponse" style={{width: '100%'}} />
              <p>Vous allez recevoir un email de confirmation et la suite des étapes.</p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
)

export default FormPage
