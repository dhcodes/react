import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    const people = []

    for (let i = 0; i<10; i++) {
      people.push({
        name: chance.first(),
        country: chance.country({ full: true })
      })
    }
    this.state = {
      people
      }
    }



  buttonClicked() {
    this.forceUpdate()
  }

  render() {
    return (
      <div>
      {this.state.people.map((person, index) => (
        <p>Hello, {person.name} from {person.country}!</p>
      ))}
      <button onClick={this.buttonClicked.bind(this)}>Make New Names</button>
      </div>
  )}
}

export default Detail;
