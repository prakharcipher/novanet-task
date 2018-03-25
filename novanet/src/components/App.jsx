import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Movie from './Movie';
import Watched from './Watched';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movie: null,
      count: 0
    };
  }

  search() {
    this.setState({ count: this.state.count + 1 });
    const BASE_URL = 'http://www.omdbapi.com/?apikey=45539fcb&';
    let FETCH_URL = `${BASE_URL}t=${this.state.query}`;

    var myOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const movieData = json;
        this.setState({ movie: movieData });
      });
  }

  render() {
    console.log(this.state.query);
    return (
      <div>
        <AppBar
          zDepth={1}
          title="MovieDB"
          iconElementRight={
            <TextField
              hintText="Search a movie.."
              hintStyle={{ color: '#8c8c8c' }}
              inputStyle={{ color: 'white', opacity: '0.8' }}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search();
                }
              }}
            />
          }
          style={{ backgroundColor: '#333333' }}
        />
        {this.state.movie !== null && this.state.movie.Response === 'True' ? (
          <Movie movie={this.state.movie} />
        ) : (
          <div
            style={{
              height: '350px',
              color: 'green',
              backgroundColor: '#262626',
              opacity: '0.8'
            }}
          >
            <p
              style={{ padding: '10% 42%', marginTop: '0%', fontSize: '20px' }}
            >
              Try another movie now! &#9786;
            </p>
          </div>
        )}
        <Watched />
      </div>
    );
  }
}

export default App;
