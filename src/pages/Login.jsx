import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Load from '../components/Load';

const minChar = 3;

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
    redirect: false,
  };

  handleInputChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  handleButtonSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });

    try {
      await createUser({ name });
      this.setState({ loading: false, redirect: true });
    } catch (err) {
      console.error('Erro ao entrar com usuário:', err);
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, loading, redirect } = this.state;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        { loading ? <Load />
          : (
            <form>
              <input
                type="text"
                id="name"
                value={ name }
                data-testid="login-name-input"
                placeholder="Nome"
                onChange={ this.handleInputChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ name.length < minChar }
                onClick={ this.handleButtonSubmit }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default Login;
