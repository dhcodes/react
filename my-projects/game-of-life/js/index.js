'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      gen: 0,
      running: false,
      status: 'random',
      grid: [],
      height: window.innerHeight,
      width: window.innerWidth
    };
    return _this;
  }

  Board.prototype.componentDidMount = function componentDidMount() {};

  Board.prototype.componentWillUnmount = function componentWillUnmount() {};

  Board.prototype.componentWillMount = function componentWillMount() {};

  Board.prototype._handleClick = function _handleClick(x, y) {
    var gridCopy = this.state.grid.slice(0);
    var newAge = undefined;
    console.log(x, y);
    gridCopy[x][y].props.age == 0 ? newAge = 1 : newAge = 0;
    console.log(gridCopy[x][y].props.age);
    gridCopy[x][y] = React.createElement(Cell, { x: x, y: y, age: newAge, handleClick: this._handleClick.bind(this) });
    this.setState({
      grid: gridCopy
    });
  };

  Board.prototype._updateGrid = function _updateGrid() {
    //let gridCopy = this.state.grid.slice(0)
    //let newGrid = [];
    //console.log(gridCopy.length)

    /*for (let row = 0; row<gridCopy.length; row++) {
      for (let col = 0; col<gridCopy[row].length; col++) {
        */
    //console.log(this.state.grid)
    var oldGrid = this.state.grid;
    var newGrid = [];
    for (var row = 0; row < 40; row++) {
      newGrid.push([]);
      for (var col = 0; col < 50; col++) {
        //grid[i].push(<Cell x={i} y={j} age = {age()} handleClick = {this._handleClick.bind(this)} />)

        var count = 0;
        var top = row - 1 < 0 ? oldGrid.length - 1 : row - 1;
        //console.log(top)
        var bottom = row + 1 > oldGrid.length - 1 ? 0 : row + 1;
        //console.log(bottom)
        var left = col - 1 < 0 ? oldGrid[row].length - 1 : col - 1;
        //console.log(left)
        var right = col + 1 > oldGrid[row].length - 1 ? 0 : col + 1;
        //console.log(right)
        //console.log(oldGrid[row].length)

        //console.log(oldGrid[bottom][left].props.age)

        if (oldGrid[top][left].props.age == 1) {
          count++;
        }
        if (oldGrid[top][col].props.age == 1) {
          count++;
        }
        if (oldGrid[top][right].props.age == 1) {
          count++;
        }
        if (oldGrid[row][right].props.age == 1) {
          count++;
        }
        if (oldGrid[bottom][right].props.age == 1) {
          count++;
        }
        if (oldGrid[bottom][col].props.age == 1) {
          count++;
        }
        if (oldGrid[bottom][left].props.age == 1) {
          count++;
        }
        if (oldGrid[row][left].props.age == 1) {
          count++;
        }

        if (count < 2 || count > 3 && oldGrid[row][col].props.age == 1) {
          newGrid[row].push(React.createElement(Cell, { x: row, y: col, age: 0, handleClick: this._handleClick.bind(this) }));
        } else if (count == 3 || count == 2 && oldGrid[row][col].props.age == 1) {
          newGrid[row].push(React.createElement(Cell, { x: row, y: col, age: 1, handleClick: this._handleClick.bind(this) }));
        } else if (count == 3 && oldGrid[row][col].props.age == 0) {
          newGrid[row].push(React.createElement(Cell, { x: row, y: col, age: 1, handleClick: this._handleClick.bind(this) }));
        } else {
          newGrid[row].push(React.createElement(Cell, { x: row, y: col, age: 0, handleClick: this._handleClick.bind(this) }));
        }

        //console.log();
        //console.log(gridCopy[top][right].props.age);
        //console.log(gridCopy[row][right].props.age);
        //console.log(gridCopy[bottom][right].props.age);
        //console.log(gridCopy[bottom][col].props.age);
        //console.log(gridCopy[bottom][left].props.age);
        //console.log(gridCopy[row][left].props.age);

        //console.log(count)
      }
    }

    /*
     console.log(this.state.grid);
    let updatedGrid = this.state.grid.slice(0)
        .map((row) => {
        return row.map((cell)=> { 
        return cell.props.age
        })
      })
    for (let i = 0; i<updatedGrid.length; i++) {
      for (let j = 0; j<updatedGrid[i].length; j++) {
        let count;
        function top(i,j) {
         
           
        }
        
        
      }
    }
     
     */

    this.setState({
      running: true,
      gen: this.state.gen += 1,
      grid: newGrid
    });
  };

  Board.prototype._start = function _start() {
    if (this.state.running == false) {
      this.intervalId = setInterval(this._updateGrid.bind(this), 100);
    }
  };

  Board.prototype._stop = function _stop() {

    clearInterval(this.intervalId);
    this.setState({
      running: false
    });
  };

  Board.prototype._reset = function _reset() {
    //  this.render
    this.setState({
      status: 'random',
      grid: [],
      gen: 0
    });
  };

  Board.prototype._clear = function _clear() {
    this.setState({
      status: 'cleared',
      grid: [],
      gen: 0
    });
  };

  Board.prototype.render = function render() {
    var grid = this.state.grid;
    var status = this.state.status;
    var age;
    if (status == 'cleared') {
      age = function age() {
        return 0;
      };
    }
    if (status == 'random') {
      age = function age() {
        return Math.round(Math.random());
      };
    }
    if (grid.length == 0) {
      for (var i = 0; i < 40; i++) {
        grid.push([]);
        for (var j = 0; j < 50; j++) {
          grid[i].push(React.createElement(Cell, { x: i, y: j, age: age(), handleClick: this._handleClick.bind(this) }));
        }
      }
    }

    return React.createElement(
      'div',
      null,
      React.createElement(Controls, { gen: this.state.gen, start: this._start.bind(this), reset: this._reset.bind(this), stop: this._stop.bind(this), clear: this._clear.bind(this) }),
      React.createElement(
        'div',
        { className: 'board' },
        grid
      )
    );
  };

  return Board;
}(React.Component);

//Cell

var Cell = function (_React$Component2) {
  _inherits(Cell, _React$Component2);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Cell.prototype.cellClick = function cellClick() {
    var x = this.props.x;
    var y = this.props.y;
    this.props.handleClick(x, y);
  };

  Cell.prototype.render = function render() {

    if (this.props.age === 0) {
      status = "dead";
    } else {
      status = "live";
    }
    return React.createElement('div', { className: 'cell ' + status, onClick: this.cellClick.bind(this) });
  };

  return Cell;
}(React.Component);

//Controls

var Controls = function (_React$Component3) {
  _inherits(Controls, _React$Component3);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Controls.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'controls' },
      React.createElement(
        'h1',
        null,
        'Conway\'s Game of Life'
      ),
      React.createElement(
        'h3',
        null,
        'Made with love and React'
      ),
      React.createElement(
        'button',
        { id: 'start', onClick: this.props.start },
        'Start'
      ),
      React.createElement(
        'button',
        { id: 'stop', onClick: this.props.stop },
        'Stop'
      ),
      React.createElement(
        'button',
        { id: 'clear', onClick: this.props.clear },
        'Clear'
      ),
      React.createElement(
        'button',
        { id: 'reset', onClick: this.props.reset },
        'Reset'
      ),
      React.createElement('br', null),
      React.createElement('br', null),
      React.createElement(
        'label',
        { 'for': 'generations' },
        'Generations'
      ),
      React.createElement('input', { name: 'generations', type: 'text', id: 'gen', value: this.props.gen, disabled: true })
    );
  };

  return Controls;
}(React.Component);

ReactDOM.render(React.createElement(Board, { className: 'board' }), document.getElementById('app'));