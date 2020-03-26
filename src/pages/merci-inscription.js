import React, {useState, useEffect} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { track, Steps, getSessionId } from '../../static/tracker.js';

function track_event(step, meta={}) {
    return () => {track('merci-inscription-page', step, meta)}
}

const MerciPage = () => {

    const [sessionId, setSessionId] = useState(0);
    useEffect( () => {
        setSessionId(getSessionId())
    }, [] );

    return (
    <Layout title="Inscription Newsletter" role={ true }>
     <div className="container-fluid covid" style={{ margin: '.5rem 0rem 1rem 0rem',  padding: '1rem 0rem 1rem 0rem', zIndex:100, position:'relative'}} role="banner">
            <div className="row numlist">
              <div className="col-md-10 offset-xl-1 offset-0 col-12" style={{paddingLeft:'2.1rem'}}>
                <h1>Vous êtes inscrit à la newsletter d'ANDi</h1>
                <div className="row mt-0">
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0" style={{fontSize: '1.4em'}}>
                        <p>Votre inscription a bien été prise en compte. Un mail de confirmation vous à été envoyé.</p>
                        <p>L'équipe ANDi vous remercie et vous souhaite une belle journée.</p>
                    </div>
                    <div className="col-11 col-lg-8 offset-xl-1 offset-0">
                        <Link className="button large btn-xl" to={"/?sid=" + sessionId} style={{marginTop: '2rem'}} onClick={track_event(Steps.LINKTO, {link:'/', type:'internal'})} >{ "Retour à l'accueil 🚀" }</Link>
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

export default MerciPage;
