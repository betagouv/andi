import React from 'react';
import { connect } from 'formik';

function OnSubmitValidationError(props) {
    const { callback, formik } = props;

    const effect = () => {
        if (formik.submitCount > 0 && !formik.isSubmitting && !formik.isValid) {
            callback(formik);
        }
    };
    React.useEffect(effect, [formik.submitCount, formik.isSubmitting]);

    return null;
}

export default connect(OnSubmitValidationError);
