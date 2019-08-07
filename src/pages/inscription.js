import React from "react"
import { Link, graphql } from "gatsby"
import { mdReact } from 'markdown-react-js';

import Layout from "../components/layout"

export const query = graphql`
{ 
    andi {
        assets {
            key
            value
            description
        }
    }
}
`

class FormPage extends React.Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      let data = {};
      // For now evolutility graphql does not support filters, so filter here instead
      for (let asset of props.data.andi.assets) {
          if (asset.description === 'lp_inscription') {
              // FIXME: add "is_markdown" flag to table
              if (!['envoyer', 'page_accueil', 'page_inscription'].includes(asset.key))
                  data[asset.key] = mdReact()(asset.value)
              else
                  data[asset.key] = asset.value
              }
      }
      this.d = data
      console.log(this.d)
      console.log(this.d.envoyer)
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
            <div>
              <Link to="/" style={{color: '#fff'}}>{ this.d.page_accueil }</Link> / { this.d.page_inscription }
            </div>
            { this.d.description }
            { /*<h4>Cette expérimentation est faite pour vous si vous souhaitez :</h4>
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
            */ }

          </div>
          <div className="col section pane section-grey" role="form" style={{marginTop: '0'}}>
            <h1>{ this.d.titre }</h1>

            <p>{ this.d.experimental }</p>
            <form action="https://usebasin.com/f/2ed85c3d52b3" acceptCharset="UTF-8" encType="multipart/form-data" method="POST">
                <div className="form__group">
                  <label htmlFor="prenom">{ this.d.prenom }</label>
                  <input name="prenom" id="prenom" type="text" required onClick={ this.handleClick }/>
                </div>
                <div className="form__group">
                  <label htmlFor="nom">{ this.d.nom }</label>
                  <input name="nom" id="nom" type="text" required onClick={ this.handleClick }/>
                </div>
                <div className="form__group">
                  <label htmlFor="email">{ this.d.email }</label>
                  <input name="email" id="email" type="email" required onClick={ this.handleClick }/>
                </div>
                <input type="submit" className="button light-green" value={ this.d.envoyer } style={{width: '100%'}} onClick={ this.handleClick }/>
                <p>{ this.d.apres_envoi }</p>
              </form>
            </div>
            </div>
          </section>
        </Layout>
      )
    }
}

export default FormPage
