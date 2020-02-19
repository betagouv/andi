import React from "react"
import { graphql } from "gatsby"
import { mdReact } from 'markdown-react-js';

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import illu1 from '../images/illu-1.png';
import illu1_2x from '../images/illu-1@2x.png';
import illu1_3x from '../images/illu-1@3x.png';

import team_illu from '../images/team-startup-illu.png';
import team_illu_2x from '../images/team-startup-illu@2x.png';
import team_illu_3x from '../images/team-startup-illu@3x.png';

import { track, Steps, getSessionId } from '../../static/tracker.js';

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
            description
            markdown
        }
    }
}
`

// const abbr_andi = "accompagnement numérique au développement de l'insertion"

const PointDetail = ({number, title, text=false}) => (
    <div className="col">
      <div className="number"><span className={ number }></span></div>
      <h3>{ title }</h3>
      { text 
        ?  <p>{ text }</p>
        :  <p></p>
      }
    </div>
)

function track_event(step, meta={}) {
    return () => {track('landing-page', step, meta)} ;
}

const Hero = ({title, text, button}) => {

     return (
     <section className="section section-grey section__bottom_svg" role="banner">
       <div className="container-fluid">
         <div className="row">
           <div className="col-lg-7 offset-lg-1 col-sm-10 offset-sm-1 col-xs-12 offset-xs-0 title_wrapper">
             <h1>{ title }</h1>
             <div className="hero__p">
               { text }
             </div>
             { /* J'assume */ }
             <br />
             <br />
             { /*<Link className="button large btn-xl" to="https://andi.beta.gouv.fr/service" style={{top: '-40px'}}>{ button }</Link> */}
             <a className="button large btn-xl" href={"/service?sid=" + getSessionId()} style={{top: '-40px'}} onClick={track_event(Steps.TO_SERVICE)} >{ button }</a>
           </div>
           <div className="col-lg-4 col-sm-12 text-right no-gutters">
           <img  className="opt_img illu-1" src={illu1} alt="" srcSet={`${illu1_2x} 2x, ${illu1_3x} 3x`}  />
           </div>
         </div>
       </div>
     </section>
     )
}


class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        let data = {};
        // For now evolutility graphql does not support filters, so filter here instead
        for (let asset of props.data.andi.assets) {
            if (asset.description === 'lp_accueil') {
                data[asset.key] = asset.markdown ? mdReact()(asset.value) : asset.value
            }
        }
        this.d = data
        track_event(Steps.ARRIVAL)();
    }

    render() {
        return (
            <Layout title="Accueil ANDi">
            <Hero title={ this.d.titre } text={this.d.slogan} button={this.d.bouton} />
            <main role="main">
               {/* <div className="svg_container" aria-hidden="true" focusable="false">
                  <svg className="svg_1" viewBox="0 70 500 80" preserveAspectRatio="none">
                    <rect x={0} y={0} width={500} height={500} style={{stroke: 'none'}} />
                    <path d="M0,100 C150,0 350,250 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}} />
                  </svg>
                </div> */}
                <section>
                  <h2 className="section__title" style={{marginTop: '3rem'}}>{ this.d.soustitre1 }</h2>
                  <div className="container-fluid" style={{marginTop: '6rem', marginBottom: '4rem'}}>
                    <div className="row numlist">
                      <div className="col-lg-10 offset-lg-1 col-sm-12">
                        <div className="row">
                          { /*
                          <div className="col">
                            <span className="number">1</span>
                            <h3>{ this.d.point1 }</h3>
                            <p>{ this.d.point1_texte }</p>
                            <Link className="button fullwidth large" to="/inscription">{ this.d.bouton }</Link>
                          </div>
                          */ }
                          { /* <PointDetail number="icon-one" title={ this.d.point1 }  text={ this.d.point1_texte } /> */ }
                          <PointDetail number="icon-one" title={ this.d.point1 } />
                          <PointDetail number="icon-two" title={ this.d.point2 } />
                          <PointDetail number="icon-three" title={ this.d.point3 } />
                          { /*
                          <PointDetail number="icon-four" title={ this.d.point4 } />
                          */ }
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
                <section id="a-propos" className="section-grey" style={{marginTop: '1rem', paddingBottom: '8rem'}}>  
                  <div className="container-fluid" style={{display: 'inline-block'}}>
                    <div className="row no-gutters">
                      <div className="col-lg-10 offset-lg-1 col-xs-12">
                        <div className="row">
                          <div className="col-lg-5 col-xs-12 align-self-center">
                              <h2>{ this.d.soustitre2 }</h2>
                              <div>{ this.d.quinous }</div>
                          </div>
                          <div className="col-lg-7 col-xs-12 align-self-center text-center no-gutters">
                            <img className="opt_img team-startup-illu" src={team_illu} alt="" srcSet={`${team_illu_2x} 2x, ${team_illu_3x} 3x`} />
                          </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                </section>
            </main>
            </Layout>
    )
    }
}

export default IndexPage
