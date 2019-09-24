import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PageForm from "../components/journal_de_bord_psh"
const App = () => (
  <Layout>
    <Router>
      <PageForm path="/form/jdb" />
    </Router>
  </Layout>
)
export default App
