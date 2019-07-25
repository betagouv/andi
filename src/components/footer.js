import React from "react"
import { Link } from "gatsby"


import twitter_icon from '../images/twitter.svg';

const Footer = () => (
      <footer className="footer" role="contentinfo">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 offset-xs-0 col-lg-6 offset-lg-1">
              <h2>Dîtes-nous tout</h2>
              <p style={{marginTop: '20px', marginBottom: '25px'}}>Ce projet est expérimental. <br/>Si vous rencontrez des difficultés <br/>faites-le savoir ici.</p>
              <div className="form__group">
                  <label htmlFor="email">Email</label>
                  <input name="email" id="email" type="text" placeholder="Ex: mail@andi.beta.gouv.fr" title="Ex: mail@andi.beta.gouv.fr" required/>
              </div>
              <div className="form__group">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" type="text" placeholder="Dites nous tout !" title="Dites nous tout !" rows="5" required></textarea>
              </div>
              <div className="form__group text-right">
                  <button type="submit" className="button-outline large button-submit__footer" value="Envoyer">Envoyer</button>
              </div>
            </div>
            <div className="col-xs-12 offset-xs-0 col offset-lg-2">
              <h2>Liens</h2>
              <ul className="footer-link">
                <li><Link to="/conditions-generales">Plan du site</Link></li>
                <li><a href="mailto:andi@beta.gouv.fr" title="Nous écrire un mail">Lien GitHub</a></li>
                <ul class="social-link col-6 col-xs-4">
                    <li className="col">
                      <a href="">
                        <span className="icon-twitter"></span>
                      </a>
                    </li>
                    <li className="col">
                      <a href="">
                        <span className="icon-medium"></span>
                      </a>
                    </li>
                    <li className="col">
                      <a href="">
                        <span className="icon-linkedin"></span>
                      </a>
                    </li>
                    <li className="col">
                      <a href="">
                        <span className="icon-facebook"></span>
                      </a>
                    </li>
                </ul>
                <li><Link to="/conditions-generales">Mentions légales</Link></li>
                <Link to="/" style={{marginTop: '25px', color: 'white', display: 'block'}}>Retour en haut de page</Link>
              </ul>
            </div>
          </div>
        </div>
      </footer>
)

export default Footer
