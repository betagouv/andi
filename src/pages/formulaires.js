import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import JdbPshForm from "../components/forms/jdb_psh"
const App = () => (
  <Layout role="main">
    <Router>
      <JdbPshForm path="/formulaires/journal-de-bord/p/:andi_id" />
    </Router>
  </Layout>
)
export default App
