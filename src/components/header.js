// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Svg from "./svg"

import marianneSVG from '../images/logo-marianne.svg'
// import betagouvSVG from '../images/pointbetagouvfr.svg'

/*
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)
*/

const Header = () => (
    <>
        <Svg />
        {/* Fixme when nav menu exists: <header className="navbar" role="navigation" aria-label="en-tête de la page"> */ }
        <header className="navbar" aria-label="en-tête de la page">
            <div className="navbar__container">
              <Link to="/" className="navbar__home">
                <img className="navbar__logo" src={marianneSVG} alt="logo république française" />
                <span className="navbar_domain">andi<b>.beta.gouv.</b><em>fr</em></span>
              </Link>
            </div>
            <div className="sub-nav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className='nav-link' activeClassName="active" style={{marginRight: '10px'}}>Accueil</Link>
                </li>
                {/* <li className="nav-item">
                <Link to="#a-propos" className="nav-link">Présentation</Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/inscription" className='nav-link' activeClassName="active">Inscription</Link>
                </li>
              </ul>
              {/* <ul className="navbar-nav">
                <li style={{marginRight: '10px'}}>
                  <a className="button ear-btn-icon secondary" aria-label="aide" href="#"></a>
                </li>
                <li className="nav-item">
                  <a className="button secondary" href="#" style={{whiteSpace: 'nowrap'}}>Adapter l'affichage</a>
                </li>
              </ul> */}
            </div>
      </header>
    </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
