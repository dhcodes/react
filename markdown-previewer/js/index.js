"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UI = function (_React$Component) {
  _inherits(UI, _React$Component);

  function UI(props) {
    _classCallCheck(this, UI);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { value: undefined };
    _this.handleChange = _this.handleChange.bind(_this);

    return _this;
  }

  UI.prototype.handleChange = function handleChange(event) {
    var markedValue = marked.parse(event.target.value, { sanitize: true });
    console.log(markedValue);
    this.setState({ value: markedValue });
  };

  UI.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { "class": "container-fluid" },
        React.createElement(
          "h1",
          { "class": "center-block" },
          "React",
          React.createElement("br", null),
          "Markdown",
          React.createElement("br", null),
          "Previewer"
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "large-4 column" },
              React.createElement(
                "h3",
                null,
                "Plain Text"
              ),
              React.createElement(
                "p",
                null,
                "Write your markdown."
              ),
              React.createElement(
                "div",
                null,
                React.createElement("textarea", { className: "plain", wrap: "physical", name: "plain", onChange: this.handleChange })
              )
            ),
            React.createElement(
              "div",
              { className: "large-4 columns" },
              React.createElement(
                "h3",
                null,
                "Markup"
              ),
              React.createElement(
                "p",
                null,
                "See your markup!"
              ),
              React.createElement(
                "div",
                null,
                React.createElement("textarea", { disabled: true, wrap: "physical", name: "marked", value: this.state.value })
              )
            ),
            React.createElement(
              "div",
              { className: "large-4 columns" },
              React.createElement(
                "h3",
                null,
                "Markdown"
              ),
              React.createElement(
                "p",
                null,
                "See your markdown!"
              ),
              React.createElement(
                "div",
                null,
                React.createElement("div", { disabled: true, className: "markdown", dangerouslySetInnerHTML: { __html: this.state.value } })
              )
            )
          ),
          React.createElement(
            "footer",
            null,
            "Created by ",
            React.createElement(
              "a",
              { href: "https://github.com/dhcodes" },
              "@dhcodes"
            )
          )
        )
      )
    );
  };

  return UI;
}(React.Component);

ReactDOM.render(React.createElement(UI, null), document.getElementById('ui'));