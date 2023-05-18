import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

const minChar = 2;
class Search extends React.Component {
  state = {
    albuns: [],
    artistName: '',
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
    try {
      this.setState({
        albuns: [],
        artistName: '',
        loading: true,
      });
      const response = await searchAlbumsAPI(search);
      // console.log(response);
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
        loading: false,
        search: '',
      });
    }
  };

  render() {
    const { albuns, artistName, loading, result, search } = this.state;
    return (
      <div data-testid="page-search">
        <div
          className="flex items-center my-auto justify-evenly h-60
        bg-gradient-to-r from-indigo-500 from-10%
        via-sky-500 via-30% to-emerald-500 to-90%
        "
        >
          <form className="flex items-center my-auto justify-evenly">
            <input
              type="text"
              data-testid="search-artist-input"
              id="search"
              value={ search }
              placeholder="Busque por nome do artista"
              onChange={ this.handleInputChange }
              className="mr-4 border-double border-4 border-sky-500 rounded-lg p-3"
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ search.length < minChar }
              onClick={ this.handleSearch }
              className="bg-white rounded-lg p-3"
            >
              Pesquisar
            </button>
          </form>
        </div>
        {loading ? (<Load />) : (
          <div>
            {result && (
              <p
                data-testid="search-result-text"
                className="text-center mt-3"
              >
                {`Resultado de álbuns de: ${artistName}`}
              </p>
            )}
            <section className="grid grid-cols-4 h-7 mt-7 mx-14 gap-5 mb-6">
              {
                albuns.length === 0 || !albuns.length ? (
                  <p>Nenhum álbum foi encontrado</p>
                ) : (
                  albuns.map((album) => (
                    <div
                      className="border-solid border-2
                      border-indigo-950 p-3 rounded-md text-center"
                      key={ album.collectionId }
                    >
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                        className="mx-auto"
                      />
                      <p>{album.collectionName}</p>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="font-bold pt-2"
                      >
                        Ver mais detalhes
                      </Link>
                    </div>
                  ))
                )
              }
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
