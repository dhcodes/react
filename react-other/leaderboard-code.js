class Buttons extends React.Component {
  render() {
    return (
      <button className='bigButton'>
      </button>
    )
  }
}


class Row extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }

   render() {
    return (

      <tr>
        <td>{this.props.rank}</td>
        <td><img src={this.props.src} /></td>
        <td>{this.props.user}</td>
        <td>{this.props.recent}</td>
        <td>{this.props.alltime}</td>
        <td>{this.props.lastUpdate}</td>

      </tr>

    );
  }
}



class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = { userData: [] }
    this.getData();
    };

   getData() {
   axios  .get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
    .then((response) => this.setState({ userData: response.data }))
    .catch(err => console.error(source, err.toString()))
   }

  componentDidMount() {
    this.getData()
  }





  render() {
    let items = this.state.userData.map((item, i) => {
    return (
          <Row
            rank = {i+1}
            src = {item.img}
            user = {item.username}
            recent = {item.recent}
            alltime = {item.alltime}
            lastUpdate = {item.lastUpdate}
            key = {i}
            />
      );

  });

    return (
    <div>
        <h1>freeCodeCamp Leaderboard</h1>
        <table>
          <tbody>
          <tr className="headerRow">
            <th>Rank</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Recent</th>
            <th>All-time</th>
            <th>Last Updated</th>
          </tr>

          {items}
          </tbody>
        </table>
        </div>
    )
  }
}


ReactDOM.render(<Table />, document.getElementById('app'))
