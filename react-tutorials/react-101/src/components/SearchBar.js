import React from 'react';

class SearchBar extends React.Component {
    onInputChange(term) {
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input type="text" placeholder="Find some cool gifs!" onChange={event => this.onInputChange(event.target.value)} />
            </div>

        );
    }
}

export default SearchBar;