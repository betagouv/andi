import React from 'react';
import { InputDatePicker, InputHidden, InputTextMulti, InputRadios } from '../../components/form_components';
import * as Yup from 'yup';
import { mdReact } from 'markdown-react-js';

import { Formik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import OnSubmitValidationError from '../../components/formik_validation';
import 'react-toastify/dist/ReactToastify.css';

const JDBSchema = Yup.object().shape({
    date: Yup.string().required('Champ requis'),
    desc_activities: Yup.string().required('Champ requis'),
    used_it_tools: Yup.string().required('Champ requis'),
    desc_events_ok: Yup.string(),
    desc_events_nook: Yup.string(),
})

const required = value => (value ? undefined : 'Required');

const FORM_URL = '/f/jdb_psh'
const FORM_CHECK = 'iuhs'
const TOAST_OPTIONS = {
    autoClose: 10000
}

let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", obj.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(JSON.stringify(obj.data));
    });
};

class JdbPshForm extends React.Component {
    reference = React.createRef()
    constructor(props) {
        super(props);
        let data = {};
        // For now evolutility graphql does not support filters, so filter here instead
        for (let asset of props.assets) {
            if (asset.description === 'form_jdb_psh' || asset.description === 'form_misc') {
                data[asset.key] = asset.markdown ? mdReact()(asset.value) : asset.value
            }
        }
        this.d = data;
        this.andi_id = props.andi_id;
    }

    errorForm() {
        toast.error('Champ requis manquant', TOAST_OPTIONS);
    }

    render(){
        return (
        <div className="container">
            <div className="row justify-content-md-center">
            <div className="col col-lg-6 form_container">
                <h1>{ this.d.titre }</h1>
                <p>{ this.d.description }</p>
                <Formik
                    ref={ this.reference }
                    initialValues={{
                        date: new Date(),
                        desc_activities: '',
                        used_it_tools: '',
                        desc_events_ok: '',
                        desc_events_nook: '',
                        verstopt: FORM_CHECK,
                        andi_id: this.andi_id,
                    }}
                    validationSchema={JDBSchema}
                    onSubmit={ (values, actions) => 
                        {
                        let toastId = toast.info('Envoi en cours...', {autoClose:false})
                        let close_toast = () => toast.dismiss(toastId)
                        request({'url': FORM_URL, 'data': values})
                            .then(data => {
                                close_toast()
                                toast.success('Merci pour votre envoi !', {autoClose:5000})
                                window.scrollTo(0, 0)
                                actions.resetForm()
                                actions.setSubmitting(false)
                            })
                        .catch(error => {
                            close_toast()
                            switch(error) {
                                case 'CONFLICT':
                                    // toast.success('Données déjà transmises, merci !')
                                    toast.success('Merci pour votre envoi !', {autoClose:5000})
                                    actions.resetForm()
                                    window.scrollTo(0, 0)
                                    break;
                                default:
                                    toast.warn('Erreur d\'envoi, veuillez réessayer plus tard', TOAST_OPTIONS)
                            }
                            actions.setSubmitting(false)
                        });
                        }
                    }
                >
                    {({ errors,
                        touched,
                        values,
                        setFieldValue,
                        handleSubmit,
                        isSubmitting }) => (
                    <form
                        onSubmit={ handleSubmit }
                        >
                        <OnSubmitValidationError
                            callback={ this.errorForm } />
                        <InputHidden
                            id='andi_id'
                            value={ this.andi_id }
                        />
                        <InputHidden
                            id='verstopt'
                            value={ FORM_CHECK }
                        />
                        <InputDatePicker
                            id='date'
                            label={ this.d.date_du_jour }
                            value={ values.date }
                            onChange={ setFieldValue }
                            required={ true }
                        />
                        <InputTextMulti
                            id='desc_activities'
                            label={ this.d.question_1 }
                            type="text"
                            placeholder=""
                            validate={required}
                            required={ true }
                        />
                        <InputRadios
                            id='used_it_tools'
                            label={ this.d.question_2 }
                            defs={[
                                {id: 'oui', label: 'Oui'},
                                {id: 'non', label: 'Non'},
                            ]}
                            validate={required}
                            required={ true }
                        />
                        <InputTextMulti
                            id='desc_events_ok'
                            label={ this.d.question_3 }
                            type="text"
                            placeholder=""
                        />
                        <InputTextMulti
                            id='desc_events_nook'
                            label={ this.d.question_4 }
                            type="text"
                            placeholder=""
                        />
                        <ToastContainer />
                        <br />
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
export default JdbPshForm
