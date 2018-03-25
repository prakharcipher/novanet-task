import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWatched, removeMovie, addLiked } from '../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BadMood from 'material-ui/svg-icons/social/mood-bad';
import SocialMood from 'material-ui/svg-icons/social/mood';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Watched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      liked: '',
      id: 0
    };
  }

  handleClick(event, id) {
    event.preventDefault();

    this.setState({
      open: true,
      id: id,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  removeMovie(id) {
    this.setState({
      open: false
    });
    this.props.removeMovie(id);
  }

  renderMovies() {
    const { movies } = this.props;
    console.log(movies);
    return (
      <div
        style={{
          height: '320px',
          marginRight: '2%',
          marginLeft: '2%',
          overflowY: 'auto'
        }}
      >
        {movies.map(movie => {
          return (
            <div key={movie.id} style={{ height: '280px', display: 'inline' }}>
              <img
                src={movie.poster}
                alt="movie poster"
                width="150px"
                height="225px"
                style={{
                  marginLeft: '1%',
                  marginTop: '1%',
                  border: '2px solid gray',
                  borderRadius: '10px'
                }}
                onClick={event => this.handleClick(event, movie.id)}
              />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
                animation={PopoverAnimationVertical}
                style={{
                  backgroundColor: 'grey',
                  opacity: '0.6'
                }}
              >
                <Menu>
                  <MenuItem
                    primaryText="Remove"
                    onClick={() => this.removeMovie(this.state.id)}
                  />
                  <MenuItem
                    primaryText="Liked"
                    onClick={() => this.props.addLiked(this.state.id, 'liked')}
                  />
                  <MenuItem
                    primaryText="Disliked"
                    onClick={() => this.props.addLiked(this.state.id, 'not')}
                  />
                </Menu>
              </Popover>

              {movie.liked !== '' ? (
                <FloatingActionButton mini={true}>
                  {movie.liked === 'liked' ? <SocialMood /> : <BadMood />}
                </FloatingActionButton>
              ) : (
                <span />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          color: 'white',
          opacity: '0.7',
          height: '360px'
        }}
      >
        <h2 style={{ marginLeft: '43%' }}>Watched Movies</h2>
        {this.renderMovies()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state
  };
}

export default connect(mapStateToProps, { addWatched, removeMovie, addLiked })(
  Watched
);
