import React from 'react';
import Wizard from "../components/wizard";
import Layout from "../components/layout";
import { InputText, InputRadios, InputSelect, Error } from "../components/form_components.js";
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
          <Wizard.Page validationSchema={ QuestionnaireSchema }>
            <InputText
              id='email'
              label='Adresse e-mail'
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
              label='Votre prénom'
              component="input"
              type="text"
              placeholder="prénom"
              validate={required}
            />
            <InputText
              id='nom'
              label='Votre nom'
              component="input"
              type="text"
              placeholder="nom"
              validate={required}
            />
            <InputRadios
              id='gender'
              label='Vous êtes'
              defs={[
                {id: 'female', label: 'Une femme'},
                {id: 'male', label: 'Un homme'},
                {id: 'undef', label: 'Je ne souhaite pas le préciser'},
              ]}
              validate={required}
            />
            <InputRadios
              id='nationality'
              label='Votre Nationalité'
              defs={[
                {id: 'french', label: 'Française'},
                {id: 'eu', label: 'Union européenne, Espace économique européen ou Suisse'},
                {id: 'custom', label: '**custom**'},
              ]}
              validate={required}
            />
            <InputText
              id='age'
              label='Votre âge'
              component="input"
              type="text"
              placeholder=""
              validate={required}
            />
            <InputText
              id='postal'
              label='Votre code postal'
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
