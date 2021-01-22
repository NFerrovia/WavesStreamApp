import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// Componente para Iniciar sesión con Google, con el objetivo de que los
// streams creados tengan un ID vinculados al creador a travez de google.

class GoogleAuth extends React.Component {
  componentDidMount() {
    // configuración según la documentación de Google Auth
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          // Llave "confidencial" creada con una cuenta dummy con el objetivo de esta aplicación de práctica.
          clientId:
            '15215737769-dvnhrgan06vfsta1mmibldithsf6fhom.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // isSignedIn chequea si el usuario está con su sesión en google iniciada, para poder mostrar
  // los componentes correctamente dependiendo si lo está o no.

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // operaciónes de inicio y de cerrar sesión

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  // creación de un botón iconico de google para la autorización, con eventos a partir de el click
  // donde se chequea el estado de la sesión del usuario.

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
        </button>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Cerrar Sesión
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Iniciar sesión con Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
