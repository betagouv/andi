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
            <h4>Nous vous accompagnons pour :</h4>
            <ul>
              <li>Découvrir un métier ou un secteur d'activité</li>
              <li>Confirmer votre projet professionnel</li>
              <li>Initier une démarche de recrutement avec l'employeur</li>
            </ul>
            <p style={{marginTop: '3em'}}>Ce projet est expérimental.<br />Il se construit pour vous et avec vous.</p>
          </div>
          <div className="section pane section-grey">
            <form action="#" method="post" name="form" target="_blank" noValidate>
              <div className="form__group">
                <label htmlFor="prenom">Prénom</label>
                <input name="prenom" id="prenom" type="text" />
              </div>
              <div className="form__group">
                <label htmlFor="nom">Nom</label>
                <input name="nom" id="nom" type="text" />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" />
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
