/*
 * Questionnaire Journal de bord
 * - suivi immersion PSH lors d'une PMSMP
 * - à remplir quotidiennement, partiellement pré-rempli
 * - notes: ID Immersion, jour d'envoi
 */

import React from 'react';
import Layout from "../components/layout";
import { InputText, InputHidden, InputTextMulti, InputRadios, InputCheckboxes, InputSelect, Error } from "../components/form_components.js";
import * as Yup from 'yup';
import queryString from 'query-string';

import { Formik, Field } from 'formik';

const JDBSchema = Yup.object().shape({
    desc_activities: Yup.string().required('Champ requis'),
    used_it_tools: Yup.string().required('Champ requis'),
    desc_events_ok: Yup.string().required('Champ requis'),
    desc_events_notok: Yup.string().required('Champ requis'),
})

const required = value => (value ? undefined : 'Required');

//replace, href, ancestorOrigins, origin, protocol, host, hostname, port, pathname, search, hash, assign, reload, toString, state, key})
const PageForm = (props) => (
    <Layout role="main">
        <div className="container">
            <div className="row justify-content-md-center">
            <div className="col col-lg-6 form_container">
                <h1>Journal de bord</h1>
                <p>Nous souhaitons mieux comprendre comment se déroule votre immersion professionnelle en cours. Ces informations sont confidentielles, l'employeur ne pourra pas lire vos réponses.</p>
                <div className="notification success">{ queryString.parse(props.location.search)['aid'] }</div>
                <div className="notification success">{ 
                    [
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        new Date().getDate(),
                        ' (',
                        new Date().getSeconds(),
                        ')',
                    ].join(' ')
                }</div>
                <Formik
                    initialValues={{
                        desc_activities: '',
                        used_it_tools: '',
                        desc_events_ok: '',
                        desc_events_notok: ''
                    }}
                    validationSchema={JDBSchema}
                    OnSubmit={values => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                    <form>
                        <InputHidden
                            id='andi_id'
                            value={
                                props.location.search ? queryString.parse(props.location.search)['aid'] : 'error'
                            }
                        />
                        <InputTextMulti
                            id='desc_activities'
                            label='Décrivez les activités que vous avez effectuées cette semaine.'
                            type="text"
                            placeholder=""
                            validate={required}
                        />
                        <InputRadios
                            id='used_it_tools'
                            label='Avez-vous utilisé de la bureautique ou des outils informatiques ?'
                            defs={[
                                {id: 'oui', label: 'Oui'},
                                {id: 'non', label: 'Non'},
                            ]}
                            validate={required}
                        />
                        <InputTextMulti
                            id='desc_events_ok'
                            label='Quels ont été les événements qui vous ont plu cette semaine ?'
                            type="text"
                            placeholder=""
                            validate={required}
                        />
                        <InputTextMulti
                            id='desc_events_notok'
                            label='Quels ont été les événements qui vous ont déçu cette semaine ?'
                            type="text"
                            placeholder=""
                            validate={required}
                        />
                        <button className="button btn-primary" type="submit">Envoyer</button>
                    </form>
                )} 
                </Formik>
            </div>
            </div>
        </div>
    </Layout>


)

export default PageForm
