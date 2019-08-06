import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

/* TODO: 
 * - use gatsby images
 * - add SEO
 */
export const query = graphql`
{ 
    andi {
        assets {
            key
            value
        }
    }
}
`

const abbr_andi = "accompagnement numérique au développement de l'insertion"

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        let data = {};
        for (let asset of props.data.andi.assets) {
            data[asset.key] = asset.value
        }
        this.d = data
    }

    render() {
        return (
        <Layout>
         <div>
            <section className="section section-grey">
              <div className="row">
                <div className="container text_1">
                  <h1>{ this.d.accueil_titre_1 }</h1>
                  <h2>{ this.d.accueil_titre_2 }</h2>
                  <Link className="button large" to="/inscription">Je m'inscris</Link>
                </div>
                <img style={{}} className="opt_img illu-1" src={'illu-1.png'} alt="" srcSet="images/illu-1@2x.png 2x, images/illu-1@3x.png 3x" />
              </div>
            </section>
            <div className="svg_container" aria-hidden="true" focusable="false">
              <svg className="svg_1" viewBox="0 70 500 80" preserveAspectRatio="none">
                <rect x={0} y={0} width={500} height={500} style={{stroke: 'none'}} />
                <path d="M0,100 C150,0 350,250 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}} />
              </svg>
            </div>
            <section>
              <h2 className="section__title" style={{marginTop: '3rem'}}>Comment participer ?</h2>
              <div className="container" style={{marginTop: '6rem'}}>
                <div className="row numlist">
                  <div>
                    <span className="number">1</span>
                    <h3>Je m’inscris</h3>
                    <p>Je donne mon nom et mon email pour recevoir ensuite un questionnaire sur mon projet professionnel.</p>
                    <Link className="button fullwidth" to="/inscription">Je m'inscris</Link>
                  </div>
                  <div>
                    <span className="number">2</span>
                    <h3>Je remplis le questionnaire</h3>
                    <p>Je donne le plus d'éléments possibles sur ma situation. Je peux me faire aider d’un proche ou d’un aidant pour le remplir.</p>
                  </div>
                  <div>
                    <span className="number">3</span>
                    <h3>Je suis contacté</h3>
                    <p>Je reçois un email pour me dire quand commencera l’expérience pour moi. Elle peut démarrer plusieurs mois après l’envoi du questionnaire.</p>
                  </div>
                  <div>
                    <span className="number">4</span>
                    <h3>Je démarre l’expérience</h3>
                    <p>L’équipe <abbr title={ abbr_andi } >ANDi</abbr> m’appuie dans la recherche d’un métier qui me plaît et me met en relation avec des entreprises qui sont prêtes à m'accueillir.</p>
                  </div>
                </div>
              </div>
              <br />
              <br />
            </section>
            <div className="svg_container" aria-hidden="true" focusable="false">
              <svg className="svg_2" viewBox="0 70 500 60" preserveAspectRatio="none">
                <rect x={0} y={0} width={500} height={500} style={{stroke: 'none'}} />
                <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}} />
              </svg>
            </div>
            <section className="section section-grey" style={{marginTop: '2rem'}}>
              <div className="row">
                <div className="container text_2">
                  <h2>Qui sommes nous ?</h2>
                  <p> Nous sommes une petite équipe à la Caisse des Dépôts et nous portons un nouveau projet baptisé <strong><abbr title={ abbr_andi }>ANDi</abbr></strong>.</p>
                  <p>Notre objectif est de permettre aux personnes en situation de handicap de réaliser des immersions professionnelles.</p>
                  <p>Ce projet est en cours d’expérimentation. Il se construit actuellement avec des employeurs, des associations, des organismes d’Etat, et bien sur avec des personnes en situation de handicap qui cherchent un emploi.</p>
                </div>
                <img className="opt_img team-startup-illu" src={'team-startup-illu.png'} alt="" srcSet="images/team-startup-illu@2x.png 2x, images/team-startup-illu@3x.png 3x" />
              </div>
            </section>
          </div>
        </Layout>
    )
    }
}

export default IndexPage
