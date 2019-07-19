import React from "react"
import { Link } from "gatsby"
// import { Link } from "gatsby"

import Layout from "../components/layout"

const CguPage = () => (
    <Layout>
      <section className="hero">
        <div className="hero__container">
            <h1>Merci !</h1>
            <p>Nous avons bien reçu votre inscription.</p>
            <Link to="/" className="button large">Retour vers la page d'accueil</Link>
        </div>
      </section>
    </Layout>
)

export default CguPage
