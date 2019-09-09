import React from 'react';
import Wizard from "../components/wizard";
import Layout from "../components/layout";
import { InputText, InputTextMulti, InputRadios, InputCheckboxes, InputSelect, Error } from "../components/form_components.js";
import * as Yup from 'yup';

import { Formik, Field } from 'formik';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');



const QuestionnaireSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse mail invalide')
        .required('Champ requis'),
    prenom: Yup.string()
        .min(2, 'Trop court')
        .max(50, 'Trop long')
        .required('Champ requis'),
    // age, code_postal
    });


const TheForm = () => (
  <Layout>
    <div className="container">
      <div className="row justify-content-md-center">
      <div className="col col-lg-6 form_container">
        <h1>Questionnaire ANDi</h1>
        <p>Ce questionnaire nous sert à mieux vous connaître pour vous aider dans votre projet professionnel.
        Vous pouvez vous faire accompagner par un proche ou par un aidant pour le remplir.</p>
        <Wizard
          initialValues={{
            prenom: '',
            nom: '',
            email: '',
            gender: '',
            diplome: '',
          }}

          onSubmit={(values, actions) => {
            sleep(300).then(() => {
              window.alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            });
          }}
        >

          { /* Page 1 / 9 */ }
          <Wizard.Page validationSchema={ QuestionnaireSchema }>
            <InputText
              id='email'
              label='Adresse e-mail :'
              component="input"
              type="email"
              placeholder="e-mail"
              validate={required}
            />
            <div className="form_help">
                1. Bienvenue sur ANDi. Nous souhaitons vous aider à essayer un métier simplement. Tout d’abord, faisons connaissance. 
            </div>
            <InputText
              id='prenom'
              label='Votre prénom :'
              component="input"
              type="text"
              placeholder="prénom"
              validate={required}
            />
            <InputText
              id='nom'
              label='Votre nom :'
              component="input"
              type="text"
              placeholder="nom"
              validate={required}
            />
            <InputRadios
              id='gender'
              label='Vous êtes :'
              defs={[
                {id: 'female', label: 'Une femme'},
                {id: 'male', label: 'Un homme'},
                {id: 'undef', label: 'Je ne souhaite pas le préciser'},
              ]}
              validate={required}
            />
            <InputRadios
              id='nationality'
              label='Votre Nationalité :'
              defs={[
                {id: 'french', label: 'Française'},
                {id: 'eu', label: 'Union européenne, Espace économique européen ou Suisse'},
                {id: 'custom', label: '**custom**'},
              ]}
              validate={required}
            />
            <InputText
              id='age'
              label='Votre âge :'
              component="input"
              type="text"
              placeholder=""
              validate={required}
            />
            <InputText
              id='postal'
              label='Votre code postal :'
              component="input"
              type="text"
              placeholder=""
              validate={required}
            />
            <InputSelect
              id='diplome'
              label='Quel est le dernier diplôme que vous avez obtenu ?'
              defs={[
                {id:'sans_diplome', label:'Sans diplôme'},
                {id:'cap_bep', label:'CAP - BEP'},
                {id:'bac_bacpro', label:'Bac - Bac Pro'},
                {id:'bts_dut_deug', label:'BTS - DUT - DEUG (Bac +2)'},
                {id:'maitrise', label:'Licence - Maîtrise (Bac + 5)'},
                {id:'autre', label:'Autre'},
              ]}
              validate={required}
            />
            <InputRadios
              id='rqth'
              label='Êtes-vous reconnu(e) comme travailleur/se handicapé(e) ?'
              defs={[
                {id: 'oui', label: 'Oui'},
                {id: 'non', label: 'Non'},
                {id: 'en_cours', label: 'En cours'},
              ]}
              validate={required}
            />
            <InputRadios
              id='job'
              label="Avez-vous un emploi aujourd'hui ?"
              defs={[
                {id: 'oui', label: 'Oui'},
                {id: 'non', label: 'Non'},
                {id: 'formation_pro', label: 'Je suis en formation professionnelle'},
                {id: 'immersion_debut', label: 'Je dois débuter une immersion (PMSMP, stage)'},
              ]}
              validate={required}
            />
          </Wizard.Page>

          { /* Page 2 / 9 */ }
          <Wizard.Page>
            <InputRadios
                id='situation'
                label='Quelle est votre situation ?'
                defs={[
                  {id: 'prive', label: 'Salarié(e) du secteur privé'},
                  {id: 'public', label: 'Employé(e)du secteur public'},
                  {id: 'esat_ea', label: 'Travailleur/se en ESAT ou EA'},
                  {id: 'SIAE', label: "Je suis salarié(e) d'une structure d'insertion par l'activité économique (SIAE)"},
                  {id: 'autoentrepreneur_independant', label: 'Auto-entrepreneur/se, indépendant(e)'},
                  {id: 'contrat_aide', label: "Je bénéficie d'un contrat aidé"},
                  {id: 'arret_maladie', label: 'Je suis en arrêt maladie'},
                  {id: 'custom', label: '**custom**'},
                ]}
                validate={required}
            />
          </Wizard.Page>


          { /* Page 3 / 9 */ }
          <Wizard.Page>
            <span>3 / 9</span>
          </Wizard.Page>

          { /* Page 4 / 9 */ }
          <Wizard.Page>
            <span>4 / 9</span>
          </Wizard.Page>

          { /* Page 5 / 9 */ }
          <Wizard.Page>
            <span>5 / 9</span>
          </Wizard.Page>

          { /* Page 6 / 9 */ }
          <Wizard.Page>
            <div className="form_help">
                2. Nous souhaitons comprendre votre projet professionnel.
            </div>
            <div className="form_legend">
                Quels sont les secteurs d'activité suivants qui vous intéressent ?
            </div>
            <InputCheckboxes
                id='projet'
                label='Quel est votre projet ?'
                defs={[
                    {id: 'decouvrir', label: "Découvrir un métier ou un secteur d'activité"},
                    {id: 'trouver_emploi', label: "Trouver mon premier emploi"},
                    {id: 'retrouver_emploi', label: "Retrouver un emploi"},
                    {id: 'confiance_reconnecter', label: "Reprendre confiance en moi, me reconnecter au travail"},
                    {id: 'reconversion', label: "Me reconvertir"},
                    {id: 'ne_sais_pas', label: "Je ne sais pas"},
                    {id: 'custom', label: "**custom**"},
                ]}
                validate={required}
            />
            <InputTextMulti
              id='description_projet'
              label='Pouvez-vous décrire votre projet en quelques lignes?'
              legend={'Si vous n\'avez pas de projet professionnel, écrivez "je ne sais pas".'}
              type="text"
              placeholder=""
              validate={required}
            />
            <InputTextMulti
              id='postes_precedents'
              label='Quels sont les postes que vous avez occupés précédemment et qui vous ont plu ?'
              legend={'Si vous n\'avez jamais travaillé avant, écrivez "je n\'ai jamais travaillé".'}
              type="text"
              placeholder=""
              validate={required}
            />
            <InputCheckboxes
                id='projet'
                label='Quel est votre projet ?'
                legend='Vous pouvez cocher une ou plusieurs réponses.'
                defs={[
                    {id: 'admin_public', label: `Administration, service public`},
                    {id: 'agriculture_agro', label: `Agriculture, agro-alimentaire`},
                    {id: 'artisanat', label: `Artisanat`},
                    {id: 'banque_assurance_finance', label: `Banque, assurance, finance`},
                    {id: 'commerce_distrib', label: `Commerce, grande distribution`},
                    {id: 'construct_batiment_label', label: `Construction, bâtiment, habitat`},
                    {id: 'enseignement_formation', label: `Enseignement, formation`},
                    {id: 'hotel_resturant', label: `Hôtellerie, restauration`},
                    {id: 'informatique_recherche_dev', label: `Informatique, Recherche et développement`},
                    {id: 'loisirs_tourisme_art_culture', label: `Loisirs, tourisme, art, culture`},
                    {id: 'marketing_pub', label: `Marketing, publicité`},
                    {id: 'sante_medico', label: `Santé, médico-social`},
                    {id: 'transport_logistique', label: `Transport & logistique`},
                    {id: 'jardinage_espaces_vert', label: `Espaces verts, jardinage`},
                    {id: 'ne_sais_pas', label: `Je ne sais pas`},
                    {id: 'custom', label: `**custom**`},
                ]}
                validate={required}
            />
            <InputRadios
                id='decouverte_secteur'
                label={'Êtes-vous prêt(e) à découvrir un secteur d\'activité que vous ne connaissez pas ?'}
                defs={[
                  {id: 'oui', label: `Oui, le principal pour moi est de trouver du travail`},
                  {id: 'non', label: `Non, j'ai une idée précise du secteur qui m'intéresse`},
                ]}
                validate={required}
            />
          </Wizard.Page>

          { /* Page 7 / 9 */ }
          <Wizard.Page>
          </Wizard.Page>

          { /* Page 8 / 9 */ }
          <Wizard.Page>
          </Wizard.Page>

          { /* Page 9 / 9 */ }
          <Wizard.Page>
          </Wizard.Page>

          <Wizard.Page>
            <div>
              <label>Email</label>
              <Field
                name="text"
                component="input"
                type="text"
                placeholder="peu importe"
              />
              <Error name="email" />
            </div>
            <div>
              <label>Favorite Color</label>
              <Field name="favoriteColor" component="select">
                <option />
                <option value="#ff0000">❤️ Red</option>
                <option value="#00ff00">💚 Green</option>
                <option value="#0000ff">💙 Blue</option>
              </Field>
              <Error name="favoriteColor" />
            </div>
          </Wizard.Page>
        </Wizard>
      </div></div>
    </div>
  </Layout>
);

export default TheForm
