import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import JdbPshForm from "../components/forms/jdb_psh"
import JdbEntrepriseForm from "../components/forms/jdb_entreprise"

export const query = graphql`
{ 
    andi {
        assets {
            key
            value
            description
            markdown
        }
    }
}
`

const App = ({data}) => (
  <Layout role="main" showNav={ false }>
    <Router>
      <JdbPshForm path="/formulaires/journal-de-bord/p/:andi_id" assets={data.andi.assets} />
      <JdbEntrepriseForm path="/formulaires/journal-de-bord/e/:andi_id" assets={data.andi.assets} />
    </Router>
  </Layout>
)
export default App
