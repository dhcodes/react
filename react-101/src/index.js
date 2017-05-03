import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar'
import GifList from './components/GifList'
import request from 'superagent';
import './styles/app.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    }
  }

handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
    
    request.get(url)
    .end((err, res) => {
    console.log(res.body.data[0])
    this.setState({ gifs: res.body.data })
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