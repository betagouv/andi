import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const ContactPage = () => (
    <Layout>
        <section style={{paddingBottom: '100px'}}>
            <div className="header__contact">
                <div className="row">
                    <div className="col-xs-10 offset-1 col-lg-8 offset-lg-2">
                        <Link to="/" style={{color: '#fff'}}>Accueil</Link> / Contact
                        <h1>Dites nous tout</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-10 offset-1 col-lg-8 offset-lg-2">
                    <p style={{marginTop: '20px', marginBottom: '0'}}>Ce projet est expérimental. <br/>Si vous rencontrez des difficultés <br/>faites-le savoir ici.</p>
                </div>
            </div>
            <div className="row">
                <form className="col-xs-10 offset-1 col-lg-8 offset-lg-2">
                    <div className="form__group">
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="text" placeholder="Ex: mail@andi.beta.gouv.fr" title="Ex: mail@andi.beta.gouv.fr" required/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" type="text" placeholder="Dites nous tout !" title="Dites nous tout !" rows="5" required></textarea>
                    </div>
                    <div className="form__group text-right">
                        <input type="submit" className="button large" value="Envoyer" style={{width: '25%'}} />
                    </div>
                </form>
            </div>
        </section>
    </Layout>
)

export default ContactPage;