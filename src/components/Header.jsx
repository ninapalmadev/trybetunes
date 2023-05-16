import React from 'react';
import { Link } from 'react-router-dom/';
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
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        { loading ? <Load /> : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
