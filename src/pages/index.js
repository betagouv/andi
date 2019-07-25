import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import illu1 from '../images/illu-1.png';
import illu1_2x from '../images/illu-1@2x.png';
import illu1_3x from '../images/illu-1@3x.png';

import team_illu from '../images/team-startup-illu.png';
import team_illu_2x from '../images/team-startup-illu@2x.png';
import team_illu_3x from '../images/team-startup-illu@3x.png';

/* TODO: 
 * - use gatsby images
 * - add SEO
 * /

/*
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Testing CI I C ?.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
*/
const abbr_andi = "accompagnement numérique au développement de l'insertion"

const IndexPage = () => (
    <Layout>
     <div>
        <section className="section section-grey section__bottom_svg" role="banner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 offset-lg-2 col-sm-10 offset-sm-1 col-xs-12 offset-xs-0 title_wrapper">
                <h1>Essayez un métier simplement</h1>
                <div className="hero__p">
                  <p>Vous êtes en situation de handicap et vous souhaitez prendre ou reprendre contact avec la vie professionnelle ? Participez à notre expérience</p>
                </div>
                <Link className="button large btn-xl" to="/inscription" style={{top: '30px'}}>Je m'inscris</Link>
              </div>
              <div className="col-lg-4 col-sm-12 text-right no-gutters">
              <img style={{}} className="opt_img illu-1" src={illu1} alt="" srcSet={`${illu1_2x} 2x, ${illu1_3x} 3x`}  />
              </div>
            </div>
          </div>
        </section>
        {/* <div className="svg_container" aria-hidden="true" focusable="false">
          <svg className="svg_1" viewBox="0 70 500 80" preserveAspectRatio="none">
            <rect x={0} y={0} width={500} height={500} style={{stroke: 'none'}} />
            <path d="M0,100 C150,0 350,250 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}} />
          </svg>
        </div> */}
        <section>
          <h2 className="section__title" style={{marginTop: '6rem'}}>Comment participer ?</h2>
          <div className="container-fluid" style={{marginTop: '6rem', marginBottom: '4rem'}}>
            <div className="row numlist">
              <div className="col-lg-10 offset-lg-1 col-sm-12">
                <div className="row">
                  <div className="col">
                    <span className="number">1</span>
                    <h3>Je m’inscris</h3>
                    <p>Je donne mon nom et mon email pour recevoir ensuite un questionnaire sur mon projet professionnel.</p>
                    <Link className="button fullwidth large" to="/inscription">Je m'inscris</Link>
                  </div>
                  <div className="col">
                    <span className="number">2</span>
                    <h3>Je remplis le questionnaire</h3>
                    <p>Je donne le plus d'éléments possibles sur ma situation. Je peux me faire aider d’un proche ou d’un aidant pour le remplir.</p>
                  </div>
                  <div className="col">
                    <span className="number">3</span>
                    <h3>Je suis contacté</h3>
                    <p>Je reçois un email pour me dire quand commencera l’expérience pour moi. Elle peut démarrer plusieurs mois après l’envoi du questionnaire.</p>
                  </div>
                  <div className="col pull-1">
                    <span className="number">4</span>
                    <h3>Je démarre l’expérience</h3>
                    <p>L’équipe <abbr title={ abbr_andi } >ANDi</abbr> m’appuie dans la recherche d’un métier qui me plait et me met en relation avec des entreprises qui sont prêtes à m'accueillir.</p>
                  </div>
                </div>
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
        <section className="section-grey" style={{marginTop: '1rem', paddingBottom: '8rem'}}>  
          <div className="container-fluid" style={{display: 'inline-block'}}>
            <div className="row no-gutters">
              <div className="col-lg-10 offset-lg-1 col-xs-12">
                <div className="row">
                  <div className="col-lg-5 col-xs-12 align-self-center">
                      <h2>Qui sommes nous ?</h2>
                      <p> Nous sommes une petite équipe à la Caisse des Dépôts et nous portons un nouveau projet baptisé <strong><abbr title={ abbr_andi }>ANDi</abbr></strong>.</p>
                      <p>Notre objectif est de permettre aux personnes en situation de handicap de réaliser des immersions professionnelles.</p>
                      <p>Ce projet est en cours d’expérimentation. Il se construit actuellement avec des employeurs, des associations, des organismes d’Etat, et bien sur avec des personnes en situation de handicap qui cherchent un emploi.</p>
                  </div>
                  <div className="col-lg-7 col-xs-12 align-self-center text-center no-gutters">
                    <img className="opt_img team-startup-illu" src={team_illu} alt="" srcSet={`${team_illu_2x} 2x, ${team_illu_3x} 3x`} />
                  </div>
                  </div>
                </div>
              </div> 
            </div>
        </section>
      </div>
    </Layout>
)

export default IndexPage
