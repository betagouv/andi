import React from "react"
import { graphql, Link } from "gatsby"
import { mdReact } from 'markdown-react-js';

// import Layout from "../components/layout"
// import Image from "../components/image"
 import SEO from "../components/seo"

import illu1 from '../images/illu-1.png';
import illu1_2x from '../images/illu-1@2x.png';
import illu1_3x from '../images/illu-1@3x.png';

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

const Hero = ({title, text, button}) => (
     <section className="section section-grey section__bottom_svg" role="banner">
       <div className="container-fluid">
         <div className="row">
           <div className="col-lg-7 offset-lg-1 col-sm-10 offset-sm-1 col-xs-12 offset-xs-0 title_wrapper">
             <SEO title="50X: Erreur serveur" />
             <div className="hero__p">
               <p>Un erreur du service empêche son fonctionnement</p>
             </div>
             { /* J'assume */ }
             <br />
             <br />
             <Link className="button large btn-xl" to="/" style={{top: '-40px'}}>{ "Accueil" }</Link>
           </div>
           <div className="col-lg-4 col-sm-12 text-right no-gutters">
           <img  className="opt_img illu-1" src={illu1} alt="" srcSet={`${illu1_2x} 2x, ${illu1_3x} 3x`}  />
           </div>
         </div>
       </div>
     </section>
)


class ErrorPage extends React.Component {

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
    }

    render() {
        return (
            <Hero title={ this.d.titre } text={this.d.slogan} button={this.d.bouton} />
    )
    }
}

export default ErrorPage
