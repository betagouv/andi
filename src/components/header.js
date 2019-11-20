// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Svg from "./svg"

import marianneSVG from '../images/logo-marianne.svg'
// import marianneDeuilPNG from '../images/logo-marianne-deuil.png'
// import betagouvSVG from '../images/pointbetagouvfr.svg'

const Header = ({showNav=true}) => {
    showNav = false
    return (
        <>
        <Svg />
        {/* Fixme when nav menu exists: <header className="navbar" role="navigation" aria-label="en-tête de la page"> */ }
        <nav>
            <header className="navbar" aria-label="en-tête de la page" >
                <div className="navbar__container">
                  <Link to="/" className="navbar__home">
                    <img className="navbar__logo" src={marianneSVG} alt="logo république française" />
                    <span className="navbar_domain">andi<b>.beta.gouv.</b><em>fr</em></span>
                  </Link>
                </div>
                
                { showNav
                  ? <div className="sub-nav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link to="/" className='nav-link' activeClassName="active" style={{marginRight: '10px'}}>Accueil</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/inscription" className='nav-link' activeClassName="active">Inscription</Link>
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
