import PropTypes from 'prop-types';
import React from 'react';
import Load from './Load';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checkedBtn: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    const getFavorites = await getFavoriteSongs();
    const findSong = getFavorites.some((song) => song.trackName === trackName);
    this.setState({ checkedBtn: findSong });
    // console.log(findSong);
  }

  handleCheck = async ({ target: { checked } }) => {
    const { trackName } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(trackName);
      console.log(trackName);
    } else {
      await removeSong(trackName);
    }
    this.setState({ checkedBtn: checked, loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, checkedBtn } = this.state;
    if (loading) {
      return <Load />;
    }
    return (
      <div>
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
              name="checked"
              data-testid={ `checkbox-music-${trackId}` }
              id="favorite"
              checked={ checkedBtn }
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
export default MusicCard;
