import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar'
import GifList from './components/GifList'
import request from 'superagent';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    }
  }
handleTermChange(term) {
  console.log(term);
  const url = `http://api.giphy.com/v1/gifs/search?q=${term}&limit=30&api_key=dc6zaTOxFJmzC`;

  request.get(url)
    .end(function(err, res) {
    console.log(res.body.data[0])
  })
}

  render() {
    return (
      <div>
        <SearchBar onTermChange={this.handleTermChange} />
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));