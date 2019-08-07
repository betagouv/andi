import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class FormPage extends React.Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'click', event.target.id]);
  }

  handleSubmit(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'submit']);
  }
  render(){
    return (
    <Layout>
      <section>
        <div className="row">
          <div className="col section pane leftpane" role="main">
            <div className="container-fluid">
              <div className="col-lg-9 offset-lg-2">
                    <div>
                      <Link to="/" style={{color: '#fff'}}>Accueil</Link> / Inscription
                    </div>
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
              </div>
            </div>
            <div className="col section pane section-grey" role="form" style={{marginTop: '0'}}>
              <div className="container-fluid">
                <div className="col-12 col-lg-10" style={{marginTop: '40px'}}>
                  <h1>Inscrivez-vous pour participer à l'aventure</h1>

                  <p>Ce projet est expérimental. Il se construit pour vous et avec vous. Chacun est libre d’y participer et de l’arrêter quand il le souhaite.</p>
                  <form action="https://usebasin.com/f/2ed85c3d52b3" acceptCharset="UTF-8" encType="multipart/form-data" method="POST">
                      <div className="form__group">
                        <label htmlFor="prenom">Prénom</label>
                        <input name="prenom" id="prenom" type="text" required onClick={ this.handleClick }/>
                      </div>
                      <div className="form__group">
                        <label htmlFor="nom">Nom</label>
                        <input name="nom" id="nom" type="text" required onClick={ this.handleClick }/>
                      </div>
                      <div className="form__group">
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" required onClick={ this.handleClick }/>
                      </div>
                      <input type="submit" className="button light-green" value="Envoyer ma demande d’inscription" style={{width: '100%'}} onClick={ this.handleClick }/>
                      <p style={{fontSize: '12px'}}>En cliquant sur "Envoyer ma demande d’inscription", <Link to="/conditions-generales" style={{color: '#26353f'}}><span className="underline"> j’accepte les conditions générales d’utilisation</span></Link></p>
                      <p>Vous allez recevoir un email de confirmation et la suite des étapes.</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      )
    }
}

export default FormPage
