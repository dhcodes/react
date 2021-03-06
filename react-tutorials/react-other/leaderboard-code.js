class Row extends React.Component {

  constructor(props) {
    super(props)

  }

   render() {
    return (

      <tr>
        <td>{this.props.rank}</td>
        <td><img src={this.props.src} /></td>
        <td>{this.props.user}</td>
        <td>{this.props.recent} <i className="em em-cookie"></i></td>
        <td>{this.props.alltime} <i className="em em-cookie"></i></td>
        <td className="date">{this.props.lastUpdate}</td>

      </tr>

    );
  }
}



class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = { userData: [] }
    this.getRecent();
    };


 getAlltime() {
   axios
     .get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
     .then((response) => this.setState({ userData: response.data }))
     .catch(err => console.error(source, err.toString()))
   this.forceUpdate()
   }

  getRecent() {
   axios
     .get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
     .then((response) => this.setState({ userData: response.data }))
     .catch(err => console.error(source, err.toString()))

   }

  /*
  componentDidMount() {
    this.getRecent()
  }
  */

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
            <th className="clickable" onClick= {this.getRecent.bind(this)}>Recent</th>
            <th className="clickable" onClick = {this.getAlltime.bind(this)}>All-time</th>
            <th className="date">Last Updated</th>
          </tr>

          {items}
          </tbody>
        </table>
        </div>
    )
  }
}


ReactDOM.render(<Table />, document.getElementById('app'))
