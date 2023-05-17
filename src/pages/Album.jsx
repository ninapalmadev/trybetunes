import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import Load from '../components/Load';
import MusicCard from '../components/ MusicCard';

class Album extends React.Component {
  state = {
    album: [],
    musics: [],
    loading: true,
  };

  componentDidMount() {
    this.getAlbumSongs();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const [album, ...musics] = await getMusics(id);
    console.log(album);

    this.setState({
      album,
      musics,
      loading: false,
    });
  };

  render() {
    const { album, musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <h1>
          {`${album.artistName} -  ${album.collectionName} ` }
        </h1>
        {
          loading ? (<Load />) : (
            <section>
              <h2 data-testid="artist-name">
                {album.artistName}
              </h2>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <p data-testid="album-name">
                {album.collectionName}
              </p>
            </section>
          )
        }
        <section>
          {musics.map(
            ({ previewUrl, trackName }, index) => (
              <MusicCard
                key={ index }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            ),
          )}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default Album;
