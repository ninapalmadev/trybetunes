import PropTypes from 'prop-types';
import React from 'react';
import Load from './Load';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorite: false,
    favorites: [],
  };

  // componentDidMount() {
  //   this.handleFavorites();
  // }

  handleCheck = async ({ target }) => {
    const { checked } = target;
    const { favorites } = this.state;
    this.setState({ favorite: checked }, this.handleFavorites);
    const getFavorites = await getFavoriteSongs();
    this.setState({ favorites: getFavorites });
    console.log({ favorites });
  };

  handleFavorites = async () => {
    const { musics } = this.props;
    const { favorite } = this.state;
    if (favorite === true) {
      this.setState({ loading: true });
      await addSong(musics);
      this.setState({ loading: false });
    }
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        { loading ? <Load />
          : (
            <div
              className="my-4 border-solid border-2
      border-sky-500 rounded-lg px-4 py-2 text-center"
            >
              <h2 className="my-2">
                {trackName}
              </h2>
              <div className="favicon flex justify-between">
                <label
                  htmlFor="favorite"
                >
                  Favorita
                </label>
                <input
                  type="checkbox"
                  name={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  id="favorite"
                  checked={ favorite }
                  onChange={ this.handleCheck }
                />
              </div>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musics: PropTypes.shape().isRequired,
};
export default MusicCard;
