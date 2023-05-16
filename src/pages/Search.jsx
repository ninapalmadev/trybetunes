import React from 'react';

const minChar = 2;
class Search extends React.Component {
  state = {
    search: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search"
            placeholder="Busca"
            onChange={ this.handleInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ search.length < minChar }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
