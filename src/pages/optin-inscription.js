import React, {useState, useEffect} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { track, Steps, getSessionId } from '../../static/tracker.js';

function track_event(step, meta={}) {
    return () => {track('merci-inscription-page', step, meta)}
}

const OptinPage= () => {

    const [sessionId, setSessionId] = useState(0);
    useEffect( () => {
        setSessionId(getSessionId())
    }, [] );

    return (
    <Layout title="Inscription Newsletter" role={ true }>
     <div className="container-fluid covid" style={{ margin: '.5rem 0rem 1rem 0rem',  padding: '1rem 0rem 1rem 0rem', zIndex:100, position:'relative'}} role="banner">
            <div className="row numlist">
              <div className="col-md-10 offset-xl-1 offset-0 col-12" style={{paddingLeft:'2.1rem'}}>
                <h1>Presque fini...</h1>
                <div className="row mt-0">
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0" style={{fontSize: '1.4em'}}>
                        <p>Pour compléter votre inscription à la newsletter d'ANDi, veuillez cliquer sur le lien contenu
                        dans le mail que nous venons de vous envoyer.</p>
                    </div>
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0">
                        <Link className="button large btn-xl" to={"/?sid=" + sessionId} style={{marginTop: '2rem'}}
                         onClick={track_event(Steps.LINKTO, {link:'/', type:'internal'})} >
                         Retour à l'accueil<span role="img" aria-label="courrier électronique"> 📧</span>
                         </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>


        <section style={{paddingBottom: '100px'}}>
        </section>
    </Layout>
    )
}

export default OptinPage;
