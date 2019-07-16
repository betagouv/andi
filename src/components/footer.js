import React from "react"
import { Link } from "gatsby"

const Footer = () => (
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__logo">
            <h2>andi.beta.gouv.fr</h2>
            <ul className="footer__social">
              <li><a href="https://twitter.com/ANDi_betagouv" title="Twitter"><svg className="icon icon-twitter"><use xlinkHref="#twitter" /></svg></a></li>
              <li><a href="https://github.com/betagouv/andi" title="Github"><svg className="icon icon-github"><use xlinkHref="#github" /></svg></a></li>
              {/*
                      <li><a href="https://www.facebook.com/etalab" title="Facebook"><svg class="icon icon-fb"><use xlink:href="#facebook"></use></svg></a></li>
                      */}
              <li><a href="mailto:andi@beta.gouv.fr" title="Nous écrire un mail"><svg className="icon icon-mail"><use xlinkHref="#envelope" /></svg></a></li>
            </ul>
          </div>
          <ul className="footer__links">
            <li><Link to="/conditions-generales">Conditions générales d'utilisation</Link></li>
            <li><a href="mailto:andi@beta.gouv.fr" title="Nous écrire un mail">Nous contacter</a></li>
            {/*
                    <li><a href="https://www.data.gouv.fr/reference">Données de référence</a></li>
                    <li><a href="https://www.data.gouv.fr/api">API</a></li>
                    */}
          </ul>
        </div>
      </footer>
)

export default Footer
