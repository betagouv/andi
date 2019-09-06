import React from "react"
import { Field, FieldArray } from "formik";
// Sources:
// - https://codesandbox.io/s/pjqp3xxq7q?from-embed

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

export const InputText = ({id, label, ...props}) => (
    <div className='form-group form__group'>
        <Label htmlFor={ id } classes="col-form-label">
            { label }
        </Label>
        <Field id={ id } name={ id } {...props} className='form-control' />
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

// Sources:
// - https://codesandbox.io/s/pjqp3xxq7q?from-embed
// export const Checkbox = ({
//   field: { name, value, onChange, onBlur },
//   form: { errors, touched, setFieldValue },
//   id,
//   label,
//   className,
//   ...props
// }) => {
//   return (
//     <div>
//       <input
//         name={name}
//         id={id}
//         type="checkbox"
//         value={value}
//         checked={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         // *className={classNames("radio-button")}
//       />
//       <label htmlFor={id}>{label}</label>
//       <Error name={ id } />
//     </div>
//   );
// };
// 
// 
// export class CheckboxGroup extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// 
//   handleChange = event => {
//     const target = event.currentTarget;
//     let valueArray = [...this.props.value] || [];
// 
//     if (target.checked) {
//       valueArray.push(target.id);
//     } else {
//       valueArray.splice(valueArray.indexOf(target.id), 1);
//     }
// 
//     this.props.onChange(this.props.id, valueArray);
//   };
// 
//   handleBlur = () => {
//     // take care of touched
//     this.props.onBlur(this.props.id, true);
//   };
// 
//   render() {
//     const { value, error, touched, label, className, children } = this.props;
// 
//     const classes = []
//     
//     // const classes = classNames(
//     //   "input-field",
//     //   {
//     //     "is-success": value || (!error && touched), // handle prefilled or user-filled
//     //     "is-error": !!error && touched
//     //   },
//     //   className
//     // );
// 
//     return (
//       <div className={classes}>
//         <fieldset>
//           <legend>{label}</legend>
//           {React.Children.map(children, child => {
//             return React.cloneElement(child, {
//               field: {
//                 value: value.includes(child.props.id),
//                 onChange: this.handleChange,
//                 onBlur: this.handleBlur
//               }
//             });
//           })}
//           <Error name={ id } />
//         </fieldset>
//       </div>
//     );
//   }
// }
// 
// 
// export const RadioButton = ({
//   field: { name, value, onChange, onBlur },
//   id,
//   label,
//   className,
//   ...props
// }) => {
//   return (
//     <div>
//       <input
//         name={name}
//         id={id}
//         type="radio"
//         value={id} // could be something else for output?
//         checked={id === value}
//         onChange={onChange}
//         onBlur={onBlur}
//         // className={classNames("radio-button")}
//         {...props}
//       />
//       <label htmlFor={id}>{label}</label>
//     </div>
//   );
// };
// 
// 
// export const RadioButtonGroup = ({
//   value,
//   error,
//   touched,
//   id,
//   label,
//   className,
//   children
// }) => {
//   
//   const classes = []
//   // const classes = classNames(
//   //   "input-field",
//   //   {
//   //     "is-success": value || (!error && touched), // handle prefilled or user-filled
//   //     "is-error": !!error && touched
//   //   },
//   //   className
//   // );
// 
//   return (
//     <div className={classes}>
//       <fieldset>
//         <legend>{label}</legend>
//         {children}
//         <Error name={ id } />
//       </fieldset>
//     </div>
//   );
// };
