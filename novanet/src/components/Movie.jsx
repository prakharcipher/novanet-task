import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWatched } from '../actions';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  chip: {
    margin: 2,
    display: 'inline'
  },
  button: {
    marginTop: 10,
    marginLeft: 2
  }
};

class Movie extends Component {
  movieExists(poster, movies) {
    return movies.some(function(movie) {
      return movie.poster === poster;
    });
  }

  handleClick(movies) {
    this.props.addWatched(this.props.movie.Poster, '');
  }

  render() {
    const { movies } = this.props;
    let movie = {
      Title: '',
      Released: '',
      Plot: '',
      Poster: '',
      imdbRating: '',
      rot: ''
    };
    movie = this.props.movie !== null ? this.props.movie : movie;

    return (
      <div
        style={{
          height: '350px',
          color: 'white',
          backgroundColor: '#262626',
          opacity: '0.8'
        }}
      >
        <div
          className="wrapper"
          style={{
            height: '100%',
            width: '60%',
            margin: '0 20%'
          }}
        >
          <div
            style={{
              width: '30%',
              height: '100%',
              float: 'left'
            }}
          >
            <img
              src={movie.Poster}
              alt={'Title - ' + movie.Title}
              width="200px"
              height="300px"
              style={{
                marginLeft: '11%',
                marginTop: '10%',
                border: '5px solid gray',
                borderRadius: '10px'
              }}
            />
          </div>
          <div style={{ display: 'inline-block', width: '70%' }}>
            <div style={{ marginTop: '8%' }}>
              <h2 style={{ color: '#8080ff' }}>{movie.Title}</h2>
              <i>{movie.Released}</i>
              <p
                style={{
                  whiteSpace: 'no-wrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  opacity: '0.7'
                }}
              >
                {movie.Plot}
              </p>
              <Chip style={styles.chip}>
                <b>IMDB</b>: {movie.imdbRating}
              </Chip>
              {movie.Ratings.length >= 2 ? (
                <Chip style={styles.chip}>
                  <b>Rotten Tomatoes</b>: {movie.Ratings[1].Value}
                </Chip>
              ) : (
                <div />
              )}
              <div>
                {this.movieExists(this.props.movie.Poster, movies) ? (
                  <RaisedButton
                    label="Already Watched"
                    secondary={true}
                    style={styles.button}
                  />
                ) : (
                  <RaisedButton
                    label="Add To Watchlist"
                    primary={true}
                    style={styles.button}
                    onClick={() => this.handleClick(movies)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state
  };
}

export default connect(mapStateToProps, { addWatched })(Movie);
