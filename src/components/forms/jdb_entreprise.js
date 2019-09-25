import React from 'react';
import { InputDatePicker, InputHidden, InputTextMulti, InputRadios } from '../../components/form_components';
import * as Yup from 'yup';
import { mdReact } from 'markdown-react-js';

import { Formik } from 'formik';

const JDBSchema = Yup.object().shape({
    desc_activities: Yup.string().required('Champ requis'),
    used_it_tools: Yup.string().required('Champ requis'),
    desc_events_ok: Yup.string().required('Champ requis'),
    desc_events_notok: Yup.string().required('Champ requis'),
})

const required = value => (value ? undefined : 'Required');


class JdbEntrepriseForm extends React.Component {
    constructor(props) {
        super(props);
        let data = {};
        // For now evolutility graphql does not support filters, so filter here instead
        for (let asset of props.assets) {
            if (asset.description === 'form_jdb_entreprise' || asset.description === 'form_misc') {
                data[asset.key] = asset.markdown ? mdReact()(asset.value) : asset.value
            }
        }
        this.d = data
        this.andi_d = props.andi_id
    }

    render(){
        return (
        <div className="container">
            <div className="row justify-content-md-center">
            <div className="col col-lg-6 form_container">
                <h1>{ this.d.titre }</h1>
                <p>{ this.d.description }</p>
                <Formik
                    initialValues={{
                        date: new Date(),
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
                    {({ errors,
                        touched,
                        values,
                        setFieldValue,
                        isSubmitting }) => (
                    <form>
                        <InputHidden
                            id='andi_id'
                            value={ this.andi_id }
                        />
                        <InputDatePicker
                            id='date'
                            label={ this.d.date_du_jour }
                            value={ values.date }
                            onChange={ setFieldValue }
                        />
                        <InputRadios
                            id='used_it_tools'
                            label={ this.d.question_1 }
                            defs={[
                                {id: 'oui', label: 'Oui'},
                                {id: 'non', label: 'Non'},
                            ]}
                            validate={required}
                        />
                        <InputTextMulti
                            id='desc_facts'
                            label={ this.d.question_2 }
                            type="text"
                            placeholder=""
                            validate={required}
                        />
                        <InputTextMulti
                            id='desc_difficulties'
                            label={ this.d.question_3 }
                            type="text"
                            placeholder=""
                            validate={required}
                        />
                        <button
                            className="button btn-primary"
                            type="submit"
                            disabled={ isSubmitting }>{ this.d.send }</button>
                    </form>
                )} 
                </Formik>
            </div>
            </div>
        </div>)}
}
export default JdbEntrepriseForm
