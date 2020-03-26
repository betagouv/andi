import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const MerciPage = () => (
    <Layout title="Inscription Newsletter" role={ true }>
     <div className="container-fluid covid" style={{ margin: '.5rem 0rem 1rem 0rem',  padding: '1rem 0rem 1rem 0rem', zIndex:100, position:'relative'}} role="banner">
            <div className="row numlist">
              <div className="col-md-10 offset-xl-1 offset-0 col-12" style={{paddingLeft:'2.1rem'}}>
                <h1>Vous êtes inscrits à la newsletter d'ANDi</h1>
                <div className="row mt-0">
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0" style={{fontSize: '1.4em'}}>
                        Votre inscription à bien été prise en compte. Un courrier de confirmation vous à été envoyé, avec lequel vous pouvez gerer vos préférences.
                        L'équipe ANDi vous remercie, et vous souhaite une excellente journée
                    </div>
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0">
                        <Link className="button large btn-xl" to="/" style={{marginTop: '2rem'}}>{ "Retour à l'accueil 🚀" }</Link>
                    </div>
                </div>
              </div>
            </div>
          </div>


        <section style={{paddingBottom: '100px'}}>
        </section>
    </Layout>
)

export default MerciPage;
