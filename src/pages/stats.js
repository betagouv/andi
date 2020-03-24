import React, {useState, useEffect} from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

const METABASE_SITE_URL = "https://andi.beta.gouv.fr/metabase";
const METABASE_SECRET_KEY = "cf2cdd6614efbeea460a916373ae8b02f7a5da4f8090744d826a637327b2f94a";

const StatsPage = () => {
    const [iframeUrl, setIframeUrl] = useState(false);

    useEffect( () => {
        var jwt = require("jsonwebtoken");
        
        var payload = {
          resource: { question: 11 },
          params: {},
          exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
        };

        var token = jwt.sign(payload, METABASE_SECRET_KEY);
        
        setIframeUrl(METABASE_SITE_URL + "/embed/question/" + token + "#bordered=true&titled=true");
    }, [] );

    return (
    <Layout>
      <section className="section">
        <div className="container">
            <h1>Stats ANDi</h1>
                <iframe
                    title="metabase_test"
                    src={iframeUrl}
                    frameborder="0"
                    width="800"
                    height="600"
                    allowtransparency
                ></iframe>
        </div>
      </section>
    </Layout>
    )
}

export default StatsPage
