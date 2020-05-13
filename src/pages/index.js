import React, {useState, useEffect} from "react"
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

import tickbox from '../images/tickbox.svg';
import glass from '../images/glass.svg';
import talk from '../images/talk.svg';

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
// const FormElement = ({name, text, onclick, type}) => (
//     <div className="form__group">
//       <label htmlFor={ name }>{ text }</label>
//       <input name={ name } id={ name } type={ type }required onClick={ onclick }/>
//     </div>
// )

// const abbr_andi = "accompagnement numérique au développement de l'insertion"

const PointDetail = ({image, title, text=false}) => (
    <div className="col-12 col-lg-4 offset-md-0 offset-0">
      <div className="pointdetail">
         <div className="point">
            <img src={ image } aria-hidden="true" alt="" />
        </div>
        <div className="detail">
          <h3>{ title }</h3>
          { text 
            ?  <p>{ text }</p>
            :  <p></p>
          }
        </div>
      </div>
    </div>
)

class ImmersionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.list = props.details;
        var visibility_list = {};
        for (const x of props.details) {
            visibility_list[x[0]] = false;
        }
        this.state = {show: visibility_list};
    }

    toggleHidden(i) {
        this.setState((prevState) => {
            const update = {...prevState.show};
            update[i] = !update[i];
            track_event(Steps.BUTTON_CLICK, {'question': i, 'visible': update[i]})();
            return {show: update};
        });
    }

    createList = () => {
        let list = [];

        for (const el of this.list) {
            list.push(
                <dt className="col-12 col-lg-10 col-xl-10 mt-4">
                    <button onClick={ () => this.toggleHidden(el[0]) }>
                        <span className="question">{ el[1] }</span>
                        <span className={this.state.show[el[0]] ? 'icn icon-arrow-up' : 'icn icon-arrow-down'}></span>
                    </button>
                </dt>);
            list.push(<dd className="col-12 col-lg-10 col-xl-10 mb-4">{ this.state.show[el[0]] && <span>{ el[2] }</span> }</dd>);
        }
        return list;
    }
    
    render() {
        return(
            <dl className="col-12 col-lg-10 col-xl-10 offset-xl-1 offset-0">
                { this.createList() }
            </dl>
        )
    }
}


function track_event(step, meta={}) {
    return () => {track('landing-page', step, meta)}
}

const Hero = ({title, subtitle, text, button}) => {

    const [sessionId, setSessionId] = useState(0);
    useEffect( () => {
        setSessionId(getSessionId())
    }, [] );
        

     return (
     <section className="section section-grey section__bottom_svg" style={{zIndex:0}}>
     <div className="container-fluid">
         <div className="row">
           <div className="col-lg-7 offset-lg-1 col-sm-10 offset-sm-1 col-xs-12 offset-xs-0 title_wrapper">
             <h1>{ title }</h1>
             <div className="hero__p">
               <h2>{ subtitle }</h2>
               { text }
             </div>
             { /* J'assume */ }
             <br />
             <br />
             { /*<Link className="button large btn-xl" to="https://andi.beta.gouv.fr/service" style={{top: '-40px'}}>{ button }</Link> */}
             <a className="button large btn-xl" href={"/service?sid=" + sessionId} style={{top: '-40px'}} onClick={track_event(Steps.TO_SERVICE)} >{ button }</a>
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
        this.d = data;
        this.definitions = [
            ['pourquoi', data.definition1, data.definition1_texte],
            ['temps', data.definition2, data.definition2_texte],
            ['remuneration', data.definition3, data.definition3_texte],
            ['embauche', data.definition4, data.definition4_texte],
        ];
        track_event(Steps.ARRIVAL)();
    }

    render() {
        return (
             <Layout title="Accueil ANDi" showNav={ true } role={ false }>
                <main role="main" style={{zIndex:100}}>
                    <Hero title={ this.d.titre } subtitle={ this.d.titre_description} text={this.d.slogan} button={this.d.bouton} />
                                    {/* <div className="svg_container" aria-hidden="true" focusable="false">
                      <svg className="svg_1" viewBox="0 70 500 80" preserveAspectRatio="none">
                        <rect x={0} y={0} width={500} height={500} style={{stroke: 'none'}} />
                        <path d="M0,100 C150,0 350,250 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}} />
                      </svg>
                    </div> */}
                    <section>
                      <div className="container-fluid" style={{marginTop: '2rem', marginBottom: '1rem'}}>
                        <div className="row numlist">
                          <div className="col-xl-10 offset-xl-1 offset-0 col-12">
                            <h2 className="section__title " style={{marginTop: '0rem'}}>{ this.d.soustitre1 }</h2>
                            <div className="row mt-0">
                                <ImmersionDetails details={ this.definitions } />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container-fluid" style={{marginTop: '2rem', marginBottom: '1rem'}}>
                        <div className="row numlist">
                          <div className="col-md-10 offset-xl-1 offset-0 col-12">
                            <h2 className="section__title" style={{marginTop: '0rem'}}>{ this.d.soustitre2 }</h2>
                            <div className="row mt-0">
                              <PointDetail image={ tickbox } title={ this.d.point1 } text={ this.d.point1_texte } />
                              <PointDetail image={ glass } title={ this.d.point2 } text={ this.d.point2_texte } />
                              <PointDetail image={ talk } title={ this.d.point3 } text={ this.d.point3_texte } />
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
                          <div className="col-xl-10 offset-xl-1 col-12">
                            <div className="row">
                              <div className="col-lg-5 col-xs-12 align-self-center">
                                  <h2>{ this.d.soustitrequi }</h2>
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
