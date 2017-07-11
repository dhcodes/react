"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row(props) {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  Row.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.rank
      ),
      React.createElement(
        "td",
        null,
        React.createElement("img", { src: this.props.src })
      ),
      React.createElement(
        "td",
        null,
        this.props.user
      ),
      React.createElement(
        "td",
        null,
        this.props.recent,
        " ",
        React.createElement("i", { className: "em em-cookie" })
      ),
      React.createElement(
        "td",
        null,
        this.props.alltime,
        " ",
        React.createElement("i", { className: "em em-cookie" })
      ),
      React.createElement(
        "td",
        { className: "date" },
        this.props.lastUpdate
      )
    );
  };

  return Row;
}(React.Component);

var Table = function (_React$Component2) {
  _inherits(Table, _React$Component2);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = { userData: [] };
    _this2.getRecent();
    return _this2;
  }

  Table.prototype.getAlltime = function getAlltime() {
    var _this3 = this;

    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function (response) {
      return _this3.setState({ userData: response.data });
    }).catch(function (err) {
      return console.error(source, err.toString());
    });
    this.forceUpdate();
  };

  Table.prototype.getRecent = function getRecent() {
    var _this4 = this;

    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (response) {
      return _this4.setState({ userData: response.data });
    }).catch(function (err) {
      return console.error(source, err.toString());
    });
  };

  /*
  componentDidMount() {
    this.getRecent()
  }
  */

  Table.prototype.render = function render() {

    var items = this.state.userData.map(function (item, i) {

      return React.createElement(Row, {
        rank: i + 1,
        src: item.img,
        user: item.username,
        recent: item.recent,
        alltime: item.alltime,
        lastUpdate: item.lastUpdate,
        key: i
      });
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "freeCodeCamp Leaderboard"
      ),
      React.createElement(
        "table",
        null,
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            { className: "headerRow" },
            React.createElement(
              "th",
              null,
              "Rank"
            ),
            React.createElement(
              "th",
              null,
              "Avatar"
            ),
            React.createElement(
              "th",
              null,
              "Username"
            ),
            React.createElement(
              "th",
              { className: "clickable", onClick: this.getRecent.bind(this) },
              "Recent"
            ),
            React.createElement(
              "th",
              { className: "clickable", onClick: this.getAlltime.bind(this) },
              "All-time"
            ),
            React.createElement(
              "th",
              { className: "date" },
              "Last Updated"
            )
          ),
          items
        )
      )
    );
  };

  return Table;
}(React.Component);

ReactDOM.render(React.createElement(Table, null), document.getElementById('app'));