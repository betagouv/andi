/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from 'react-helmet'
// import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
// import "./layout.css"

/*
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}
*/

const Layout = ({children}) => {
    return (
        <>
        <Helmet
            title="andi.beta.gouv.fr" defer={false}
            meta={[
                { name: 'description', content: 'Faciliter l\'immersion professionnelle des personnes en situation de handicap' }
            ]}
        >
            <html lang="fr" />
        </Helmet>
        <Header />
        <main role="main">{children}</main>
        <Footer />
        </>
    )
}



Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
