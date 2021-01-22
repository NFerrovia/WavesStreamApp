import React from 'react';
import { Field, reduxForm } from 'redux-form';

// componente reutilizable de clase, cuya función es la de un formulario con mensajes de error.

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Ingresa un título para tu nuevo canal"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Ingresa una descripción"
        />
        <button className="ui button primary">Confirmar</button>
      </form>
    );
  }
}

// a continuación configuración de mensajes de error si no se ingresaron respuestas validas.

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Ingresar un título es obligatorio';
  }

  if (!formValues.description) {
    errors.description = 'Ingresar una descripción es obligatorio';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
