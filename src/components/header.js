// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

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

// TODO: implement a as link
const Header = () => (
    <header className="navbar" role="navigation">
        <div className="navbar__container">
          <a className="navbar__home" href="index.html">
            <img className="navbar__logo" src="images/logo-marianne.svg" alt="andi.beta.gouv.fr" />
            <span className="navbar__domain">andi</span>
            <img className="navbar__gouvfr" src="images/pointbetagouvfr.svg" alt="beta.gouv.fr" />
          </a>
          <nav>
            <ul className="nav__links">
            </ul>
          </nav>
        </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
