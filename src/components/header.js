// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Svg from "./svg"

import marianneSVG from '../images/logo-marianne.svg'
import cdcSVG from '../images/logo-cdc.svg'
// import marianneDeuilPNG from '../images/logo-marianne-deuil.png'
// import betagouvSVG from '../images/pointbetagouvfr.svg'

import { track, Steps } from '../../static/tracker.js';

function track_event(step, meta={}) {
    return () => {track('landing-page', step, meta)} ;
}

const Header = ({showNav=true}) => {
    showNav = false
    return (
        <>
        <Svg />
        {/* Fixme when nav menu exists: <header className="navbar" role="navigation" aria-label="en-tête de la page"> */ }
        <nav>
            <header className="navbar" aria-label="en-tête de la page" >
                <div className="navbar__container">

                  <a href="https://www.caissedesdepots.fr/" className="navbar_cdc" onClick={ track_event(Steps.LINKTO, {link:'cdc', type:'external'}) }>
                     <img src={cdcSVG}  alt="logo caisse des dépôts"/>
                     
                  </a>
                  <Link to="/" className="navbar__home" onClick={ track_event(Steps.LINKTO, {link:'/', type:'internal'}) } style={{marginTop: '-6px'}}>
                    <img className="navbar__logo" src={marianneSVG} alt="logo république française" />
                    <span className="navbar_domain">andi<b>.beta.gouv.</b><em>fr</em></span>
                  </Link>
                </div>
                
                { showNav
                  ? <div className="sub-nav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link to="/" className='nav-link' activeClassName="active" style={{marginRight: '10px'}} onClick={ track_event(Steps.LINKTO, {link:'/', type:'internal'}) }>Accueil</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/inscription" className='nav-link' activeClassName="active" onClick={ track_event(Steps.LINKTO, {link:'/inscription', type:'internal'}) }>Inscription</Link>
                        </li>
                      </ul>
                    </div>
                  : <div />
                }
          </header>
        </nav>
        </>
    )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
