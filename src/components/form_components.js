import React from "react"
import { Field, FieldArray } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
// Sources:
// - https://codesandbox.io/s/pjqp3xxq7q?from-embed

// export class InputDatePicker extends React.component {
//     state = {
//         date: new Date()
//     }
// 
//     render() {
//         return (
//             <DatePicker
//             />
//         )
//     }
// }

export const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <div className="form_error">{errors[name]}</div> : null
    }
  />
);

export const Label = ({ classes, error, children, ...props }) => {
  return (
    <label className={ classes } {...props}>
      {children}
    </label>
  )
}

export const InputDatePicker = ({
    id,
    label,
    value,
    onChange,
    // form: { setFieldValue, setFieldTouched, values },
    ...props
    }) => {
    return (
      <div className='form-group form__group'>
        <Label htmlFor={ id } classes="col-form-label">
            { label }
        </Label>
        <DatePicker
            id={ id }
            name={ id }
            selected={(value && new Date(value)) || null}
            dateFormat='dd/MM/yyyy'
            onChange={val => {
                console.log(id, val);
                onChange(id, val);
            }}
            locale='fr'
            className='form-control'
        />
        <Error name= { id } />
      </div>
    )
};


export const InputText = ({id, label, ...props}) => (
    <div className='form-group form__group'>
        <Label htmlFor={ id } classes="col-form-label">
            { label }
        </Label>
        <Field id={ id } name={ id } component='input' className='form-control' {...props} />
        <Error name={ id } />
    </div>
)

export const InputHidden = ({id, value, ...props}) => (
    <div className='form-group form__group'>
        <Field id={ id } name={ id } component='hidden' value={value} {...props} />
    </div>
)

export const InputTextMulti = ({id, label, ...props}) => (
    <div className='form-group form__group'>
        <Label htmlFor={ id } classes="col-form-label">
            { label }
        </Label>
        <Field id={ id } name={ id } component='textarea' className='form-control' {...props}  />
        <Error name={ id } />
    </div>
)

export const InputRadios = ({id, label, defs, ...props}) => (
    <fieldset className="form-group form__group">
        <legend>{ label }</legend>
        <FieldArray
            name={ id }
            render={ arrayHelpers => (
                <div>
                    { defs.map( def => (
                        <div className="form-check">
                            <Field
                                id={ def.id }
                                name={ id }
                                className='form-check-input'
                                component='input'
                                type='radio'
                                value= { def.id }
                                {...props}
                               />
                            <Label htmlFor={ def.id } classes='col-check-label label-inline'>
                                { def.label }
                            </Label>
                        </div>
                    ))}
                </div>
            )}
        />
        <Error name={ id } />
    </fieldset>
)

export const InputCheckboxes = ({id, label, defs, ...props}) => (
    <fieldset className="form-group form__group">
        <legend>{ label }</legend>
        <FieldArray
            name={ id }
            render={ arrayHelpers => (
                <div>
                    { defs.map( def => (
                        <div className="form-check">
                            <Field
                                id={ def.id }
                                name={ id }
                                className='form-check-input'
                                component='input'
                                type='checkbox'
                                value= { def.id }
                                {...props}
                               />
                            <Label htmlFor={ def.id } classes='col-check-label label-inline'>
                                { def.label }
                            </Label>
                        </div>
                    ))}
                </div>
            )}
        />
        <Error name={ id } />
    </fieldset>
)

export const InputSelect = ({id, label, defs, ...props}) => (
    <fieldset className="form-group form__group">
        <legend>{ label }</legend>
        <FieldArray
            render ={ arrayHelpers => (
                <Field
                    id={ id }
                    className='form-control'
                    component="select">
                {defs.map( def => ( <option value={ def.id }>{ def.label }</option> ))}
                </Field>
            )}
            />
    </fieldset>
)
