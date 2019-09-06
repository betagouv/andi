import React from 'react';
import { Formik } from 'formik';

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  // validate = values => {
  //   const activePage = React.Children.toArray(this.props.children)[
  //     this.state.page
  //   ];
  //   return activePage.props.validate ? activePage.props.validate(values) : {};
  // };

  validate = values => {
    console.log("coucou")
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validationSchema(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const schema = activePage.props.validationSchema
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
              {page > 0 && (
                <button type="button" className="button" onClick={this.previous}>
                  « En arrière
                </button>
              )}

              {!isLastPage && <button className="button" type="submit">Continuer »</button>}
              {isLastPage && (
                <button className="button btn-primary" type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              )}

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default Wizard
