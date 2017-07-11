import React from 'react';
import ajax from 'superagent';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    }
}

fetchFeed() {
  const baseURL = 'https://api.github.com/users/';
  ajax.get(`${baseURL}/${this.props.params.user}/events`)
    .end((error, response) => {
      if (!error && response) {
        this.setState = { userData: response }
      }
      else {
        console.log(`Error fetching ${type}`, error)
      }
    })
}

render() {

  this.state.userData.map((data, index) => {
    return (
      <tbody>
        <tr key={index}>
          <td>{data.created_at}</td>
          <td>{data.type}</td>
          <td><a href={data.url}>{data.url}</a></td>
          <td></td>
        </tr>
      </tbody>

    )
  })
  return (
    <div>
    <h1>{user}</h1>
    <h3>Recent Activity</h3>
    <table>
    <tr>
      <th>Date Added</th>
      <th>Type</th>
      <th>Repo</th>
      <th>Link</th>
    </tr>
    <tr>
    {tbody}
    </tr>
    </table>
    </div>
  )
}

}
