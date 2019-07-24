import React from "react"
import { Link } from "gatsby"
// import { Link } from "gatsby"

import Layout from "../components/layout"

const inscriptionComplete = () => (
  <Layout>
  <section>
    <div className="row">
      <div className="col section pane leftpane" role="main">
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
        <ol>
            <li>L’équipe ANDi travaille avec vous <strong>pendant 1 à 2 mois</strong> pour <strong>définir au mieux votre projet professionnel</strong></li>
            <li>Nous vous orientons pour <strong>trouver une entreprise</strong> adaptée à votre projet professionnel et prête à vous accueillir en immersion</li>
            <li>Nous vous <strong>appuyons tout au long de votre immersion</strong>.</li>
            <li>Nous faisons un <strong>bilan à la fin de la période</strong> d'immersion et nous vous aidons à prendre la direction que vous avez choisie.</li>
        </ol>

      </div>
      <div className="col section pane section-grey" role="form">
        <div className="col-9 alert__success" style={{marginBottom: '25px', marginTop: '50px'}}>
          Votre demande d'inscription a bien été envoyé.
        </div>
        <a>Retourner à l'accueil</a>
      </div>
    </div>
  </section>
</Layout>
)

export default inscriptionComplete
