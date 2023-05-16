import React from 'react';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    try {
      const user = await getUser();
      this.setState({ name: user.name, loading: false });
    } catch (err) {
      console.error('Usuário não encontrado', err);
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Load /> : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
