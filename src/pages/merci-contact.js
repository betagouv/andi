import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const ContactPage = () => (
    <Layout>
        <section style={{paddingBottom: '100px'}}>
            <div className="header__contact">
                <div className="row">
                    <div className="col-8 offset-2">
                        <Link to="/" style={{color: '#fff'}}>Accueil</Link> / Contact
                        <h1>Dites nous tout</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <p style={{marginTop: '20px', marginBottom: '0'}}>Ce projet est expérimental. <br/>Si vous rencontrez des difficultés <br/>faites-le savoir ici.</p>
                </div>
            </div>
            <div className="row" style={{marginTop: '30px'}}>
                <div className="col-8 offset-2">
                    <div className="alert__success" style={{marginBottom: '25px'}}>
                        Votre message a bien été envoyé.
                    </div>
                    <a>Retourner à l'accueil</a>
                </div>
            </div>
        </section>
    </Layout>
)

export default ContactPage;