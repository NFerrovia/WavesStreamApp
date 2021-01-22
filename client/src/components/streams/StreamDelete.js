import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

// componente de clase cuya función es borrar canales, pero solo si el usuario es el creador.

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Borrar
        </button>
        <Link to="/" className="ui button">
          Cancelar
        </Link>
      </React.Fragment>
    );
  }

  // a continuación mensaje de confirmación de borrado y cleanup post-borrado.

  renderContent() {
    if (!this.props.stream) {
      return '¿Estás seguro que deseas borrar este canal?';
    }
    return `¿Borrar el siguiente canal?  -   ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Borrar Canal"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
