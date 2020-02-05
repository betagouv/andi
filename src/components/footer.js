import React from "react"
import { Link } from "gatsby"


const Footer = () => (
      <footer className="footer" role="contentinfo">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 offset-xs-0 col-lg-6 offset-lg-1">
              <h2>Dîtes-nous tout</h2>
              <p style={{marginTop: '20px'}}>Ce projet est expérimental. Si vous rencontrez des difficultés faites-le savoir ici.</p>
              <p style={{marginBottom: '25px'}}>Nous travaillons à rendre cette page la plus accessible possible pour vous. Nous nous excusons par avance si vous rencontrez des difficultés pour consulter ANDi.<br/>Faites-nous part de vos retours pour que nous puissions les prendre en compte.</p>
              {/* <div className="form__group">
                  <label htmlFor="email">Email</label>
                  <input name="email" id="email" type="text" placeholder="Ex: mail@andi.beta.gouv.fr" title="Ex: mail@andi.beta.gouv.fr" required/>
              </div>
              <div className="form__group">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" type="text" placeholder="Dites nous tout !" title="Dites nous tout !" rows="5" required></textarea>
              </div>
              <div className="form__group text-right">
                  <button type="submit" className="button-outline large button-submit__footer" value="Envoyer">Envoyer</button>
              </div> */}
            </div>
            <div className="col-xs-12 offset-xs-0 col offset-lg-2">
              <h2>Liens</h2>
              <ul className="footer-link">
                <li><Link to="/conditions-generales">Conditions générales</Link></li>
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
                <li><a href="mailto:ANDI_Startup@caissedesdepots.fr" title="Nous écrire un mail">Nous contacter</a></li>
                <li>
                    <ul className="social-link col-6 col-xs-4">
                    <li className="col"><a href="https://twitter.com/ANDi_betagouv" title="Twitter"><span className="icon-twitter"></span></a></li>
                    <li className="col"><a href="https://github.com/betagouv/andi" title="Github"><span className="icon-github"></span></a></li>
                    <li className="col"><a href="https://www.linkedin.com/company/andi-betagouv/" title="LinkedIn"><span className="icon-linkedin"></span></a></li>
                    </ul>
                </li>
                    {/* <li className="col">
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
                    </li> */}
                { /* </ul> */ }
                { /*<a href="#top" style={{marginTop: '25px', color: 'white', display: 'block'}}>Retour en haut de page</a>*/ }
              </ul>
            </div>
          </div>
        </div>
      </footer>
)

export default Footer
