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


const FormElement = ({name, text, onclick}) => (
    <div className="form__group">
      <label htmlFor={ name }>{ text }</label>
      <input name={ name } id={ name } type="text" required onClick={ onclick }/>
    </div>
)

class FormPage extends React.Component {
  constructor(props) {
      super(props);

      // this.formAction = 'https://usebasin.com/f/2ed85c3d52b3'
      this.formAction = 'https://andi.beta.gouv.fr/f/inscription'

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      let data = {};
      // For now evolutility graphql does not support filters, so filter here instead
      for (let asset of props.data.andi.assets) {
          if (asset.description === 'lp_inscription') {
              data[asset.key] = asset.markdown ? mdReact()(asset.value) : asset.value
          }
      }
      this.d = data
      this.handleChange = this.handleChange.bind(this);
      this.state = { checked: false };
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
 }

  handleClick(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'click', event.target.id]);
  }

  handleSubmit(event) {
      const _paq = window._paq || [];
      _paq.push(['trackEvent', 'form_action', 'submit']);
      if (!this.state.checked)
        {
        event.preventDefault()
        return false
        }
  }

  render(){
    return (
    <Layout>
      <section>
        <div className="row">
          <div className="col section pane leftpane" role="main">
            <div className="container-fluid">
              <div className="col-lg-9 offset-lg-2">
                <div className="inscription-block--left">
                  <Link to="/" style={{color: '#fff'}}>{ this.d.page_accueil }</Link> / { this.d.page_inscription }
                </div>
                <h4>{ this.d.titre_description }</h4>
                { this.d.description }
              </div>
            </div>
          </div>
          <div className="col section pane section-grey" role="form" style={{marginTop: '0'}}>
            <div className="container-fluid">
              <div className="col-12 col-lg-10 inscription-block--right" style={{marginTop: '40px'}}>
                <h1>{ this.d.titre }</h1>

                <p>{ this.d.experimental }</p>

                <form action={ this.formAction } acceptCharset="UTF-8" encType="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
                    <input type="text" name="verstopt" aria-hidden="true" style={{ display: 'none' }} value="vrst" />
                    <FormElement name="prenom" text={ this.d.prenom } onclick={ this.handleClick } />
                    <FormElement name="nom" text={ this.d.nom } onclick={ this.handleClick } />
                    <FormElement name="email" text={ this.d.email } onclick={ this.handleClick } />
                    <p>
                      <input type="checkbox" name="checkbox" value="disabled" checked={this.state.checked} onChange={this.handleChange}  required="true" />
                      <Link to="/conditions-generales" style={{color: '#26353f', fontSize: '12px'}}><span className="underline">J’accepte les conditions générales d’utilisation</span></Link>
                    </p>
                    <input type="submit" className="button light-green" value={ this.d.envoyer } style={{width: '100%'}} onClick={ this.handleClick }/>
                    <p>{ this.d.apres_envoi }</p>
                </form>

                </div>
            </div>
          </div>
        </div>
      </section>
    </Layout> )}
}

export default FormPage
