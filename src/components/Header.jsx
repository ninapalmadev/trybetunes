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
        <nav className="flex space-x-4 bg-gray-800 h-16 ">
          <Link
            data-testid="link-to-search"
            to="/search"
            className="bg-gray-900 text-white rounded-md
            px-3 py-2 text-sm font-medium self-center"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="text-gray-300 hover:bg-gray-700
            hover:text-white rounded-md px-3 py-2 text-sm font-medium self-center"
          >
            Favorites
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="text-gray-300 hover:bg-gray-700
            hover:text-white rounded-md px-3 py-2 text-sm font-medium self-center"
          >
            Profile
          </Link>
        </nav>
        { loading ? <Load /> : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
