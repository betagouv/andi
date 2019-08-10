import React from "react"
import { Link, graphql } from "gatsby"
import { mdReact } from 'markdown-react-js';

import Layout from "../components/layout"

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


class inscriptionComplete extends React.Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      let data = {};
      // For now evolutility graphql does not support filters, so filter here instead
      for (let asset of props.data.andi.assets) {
          if (['lp_inscription', 'lp_merci'].includes(asset.description)) {
              data[asset.key] = asset.markdown ? mdReact()(asset.value) : asset.value
          }
      }
      this.d = data
  }

  handleClick(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'click', event.target.id]);
      console.log('clicking')
  }

  handleSubmit(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'submit']);
  }

  render(){
    return (
    <Layout>
      <section>
        <div className="row">
          <div className="col section pane leftpane" role="main">
            <div className="container-fluid">
              <div className="col-lg-9 offset-lg-2">
                <div>
                  <Link to="/" style={{color: '#fff'}}>{ this.d.page_accueil }</Link> / { this.d.page_inscription }
                </div>
                <h4>{ this.d.titre_description }</h4>
                { this.d.description }
              </div>
            </div>
          </div>
          <div className="col section pane section-grey" role="form" style={{marginTop: '0'}}>
            <div className="container-fluid">
            <div className="col-9 alert__success" style={{marginBottom: '25px', marginTop: '50px'}}>
              { this.d.merci }
            </div>
            <Link to="/">{ this.d.bouton_retour }</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout> )}
}

export default inscriptionComplete
