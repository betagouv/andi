import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

/* TODO: 
 * - use gatsby images
 * - add SEO
 * /

/*
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
*/

const IndexPage = () => (
    <Layout>
     <div>
        <section className="section section-grey">
          <div className="row">
            <div className="container text_1">
              <h1>Notre Objectif:<br />Faciliter l'immersion professionnelle des personnes en situation de handicap.</h1>
              <h3>Vous voulez faire partie de l'expérience ?</h3>
              <Link className="button" to="/inscription">inscrivez-vous</Link>
            </div>
            <img style={{}} className="opt_img illu-1" src={'illu-1.png'} alt="début description: Une personne utilise des jumelles. Fin description." srcSet="images/illu-1@2x.png 2x, images/illu-1@3x.png 3x" />
          </div>
        </section>
        <section>
          <h2 className="section__title" style={{marginTop: '3rem'}}>Le Déroulé</h2>
          <div className="container" style={{marginTop: '6rem'}}>
            <div className="row numlist">
              <div>
                <span className="number">1</span>
                <h3>Inscrivez-vous</h3>
                <p>Inscrivez-vous et donnez nous plus d'informations sur ce que vous souhaitez faire.</p>
                <Link className="button" to="/inscription">inscrivez-vous</Link>
              </div>
              <div>
                <span className="number">2</span>
                <h3>Travaillons ensemble</h3>
                <p>Nous travaillons avec vous pour comprendre vos besoins et vous accompagner au mieux à toutes les étapes de cette expérience professionnelle.</p>
              </div>
              <div>
                <span className="number">3</span>
                <h3>Vivez l'immersion</h3>
                <p>Découvrez le métier, assurez-vous que ce métier vous plait ou commencez une démarche de recrutement... Nous restons à vos côtés.</p>
              </div>
              <div>
                <span className="number">4</span>
                <h3>Dites-nous tout</h3>
                <p>A la fin de l'expérience nous echangerons sur votre satisfaction et quels sont vos opportunités.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-grey" style={{marginTop: '2rem'}}>
          <div className="row">
            <div className="container text_2">
              <h2>Qui sommes nous ?</h2>
              <p> Nous sommes une petite équipe à la Caisse des Dépôts et nous portons un nouveau projet baptisé <b>andi</b>.</p>
              <p><b>andi</b> est un projet  en cours d’expérimentation.<br />
                Notre objectif est de permettre
                aux personnes en situation de handicap
                de réaliser des immersions professionnelles.</p>
            </div>
            <img className="opt_img team-startup-illu" src={'team-startup-illu.png'} alt="début description: l'équipe assis autour d'une table. Fin description." srcSet="images/team-startup-illu@2x.png 2x, images/team-startup-illu@3x.png 3x" />
          </div>
        </section>
      </div>
    </Layout>
)

export default IndexPage
