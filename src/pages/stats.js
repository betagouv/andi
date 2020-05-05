import React, {useState, useEffect} from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

const METABASE_SITE_URL = "https://andi.beta.gouv.fr/metabase";
const METABASE_SECRET_KEY = "cf2cdd6614efbeea460a916373ae8b02f7a5da4f8090744d826a637327b2f94a";

const StatsPage = () => {
    const [iframeUrl, setIframeUrl] = useState(false);

    useEffect( () => {
        var jwt = require("jsonwebtoken");
        
        var payload = { resource: { dashboard:  3}, params: {}, exp: Math.round(Date.now() / 1000) + (10 * 60)};
        var token = jwt.sign(payload, METABASE_SECRET_KEY);
        setIframeUrl(METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true");
    }, [] );

    return (
    <Layout>
      <section className="section">
        <div className="container">
            <h1>Statistiques ANDi</h1>
            <p>Cette page affiche, en temps réel, les stastiques de fréquentation et d'utilisation du service numérique ANDi.</p>
            <iframe
                title="metabase_test"
                src={iframeUrl}
                frameborder="0"
                width="1100"
                height="1500"
                allowtransparency
            ></iframe>
        </div>
      </section>
    </Layout>
    )
}

export default StatsPage
