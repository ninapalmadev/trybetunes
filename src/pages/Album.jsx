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
        <h1 className="text-center text-cyan-950 ">
          {`${album.artistName} -  ${album.collectionName} ` }
        </h1>
        {
          loading ? (<Load />) : (
            <section
              className="max-w-sm p-5 bg-white border
            border-gray-200 rounded-lg shadow dark:bg-gray-800
            dark:border-gray-700 m-auto text-center al mb-2"
            >
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
                className="m-auto"
              />
              <h2
                data-testid="artist-name"
                className="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                {album.artistName}
              </h2>
              <p data-testid="album-name">
                {album.collectionName}
              </p>
            </section>
          )
        }
        <section className="grid grid-cols-4 h-7 mt-7 mx-14">
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
