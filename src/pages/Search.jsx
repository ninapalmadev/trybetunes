import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

const minChar = 2;
class Search extends React.Component {
  state = {
    albuns: [],
    artistName: '',
    notFound: false,
    loading: false,
    result: false,
    search: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  handleSearch = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    // this.setState({
    //   loading: true,
    //   artistName: search,
    // });
    try {
      this.setState({
        albuns: [],
        artistName: '',
        notFound: false,
        loading: true,
      });
      const response = await searchAlbumsAPI(search);
      console.log(response);
      this.setState({
        albuns: response,
        artistName: search,
        search: '',
        loading: false,
        result: true,
      });
    } catch (err) {
      console.log('Erro ao fazer a busca:', err);
      this.setState({
        artistName: '',
        notFound: true,
        loading: false,
        search: '',
      });
    }
  };

  render() {
    const { albuns, artistName, notFound, loading, result, search } = this.state;
    return (
      <div data-testid="page-search">
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search"
            value={ search }
            placeholder="Busque por nome do artista"
            onChange={ this.handleInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ search.length < minChar }
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </form>

        {loading ? (<Load />) : (
          <div>
            {result && (
              <p data-testid="search-result-text">
                {`Resultado de álbuns de: ${artistName}`}
              </p>
            )}
            {
              albuns.length > 0 ? (
                albuns.map((album) => (
                  <div className="albumCard" key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{album.collectionName}</p>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Ver mais detalhes
                    </Link>
                  </div>
                ))
              ) : (
                <h2>Nenhum álbum foi encontrado</h2>
              )
            }
            {notFound && <p>{notFound}</p>}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
