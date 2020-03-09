// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState, useEffect} from "react"
import { Link } from "gatsby"

import Svg from "./svg"

import marianneSVG from '../images/logo-marianne.svg'
import cdcSVG from '../images/logo-cdc.svg'
// import marianneDeuilPNG from '../images/logo-marianne-deuil.png'
// import betagouvSVG from '../images/pointbetagouvfr.svg'

import { track, Steps, getSessionId } from '../../static/tracker.js';

function track_event(step, meta={}) {
    return () => {track('landing-page', step, meta)} ;
}

const Header = ({showNav=true}) => {

    const [sessionId, setSessionId] = useState(0);
    useEffect( () => {
        setSessionId(getSessionId())
    }, [] );
        
    return (
        <>
        <Svg />
        {/* Fixme when nav menu exists: <header className="navbar" role="navigation" aria-label="en-tête de la page"> */ }
        <nav className="navbar" aria-label="en-tête de la page">
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
                    <Link to="/" className='nav-link' activeClassName="active" style={{marginRight: '0px'}} onClick={ track_event(Steps.LINKTO, {link:'/', type:'internal'}) }><span className="icon-home">&nbsp;</span>Accueil</Link>
                  </li>
                  <li className="nav-item">
                     <a className='nav-link' activeClassName="active" href={"/service/summary?sid=" + sessionId} onClick={track_event(Steps.TO_SUMMARY)} ><span className="icon-glass">&nbsp;</span>Chercher une immersion</a>
                  </li>
                </ul>
              </div>
            : <div />
          }
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
