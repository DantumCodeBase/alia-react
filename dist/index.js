function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var styles = {"test":"_styles-module__test__3ybTi"};

var Input = function Input() {
  return /*#__PURE__*/React__default.createElement("input", {
    className: "alia-input"
  });
};

var Button = function Button(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement("button", {
    type: type,
    className: "d-button"
  }, children);
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var LineChart = function LineChart(props) {
  var height = props.height,
      width = props.width,
      padding = props.padding,
      data = props.data,
      labels = props.labels;
  if (!data) return null;
  var initialState2 = {};
  data.forEach(function (data, idx) {
    return initialState2[idx] = true;
  });

  var _useState = React.useState(initialState2),
      visible = _useState[0],
      setVisible = _useState[1];

  var colors = ['#304e62', '#55bcc8', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
  var FONT_SIZE = 12;
  var maxX = Math.max.apply(Math, data.map(function (d) {
    return Math.max.apply(Math, d.map(function (e) {
      return e.x;
    }));
  }));
  var minX = Math.min.apply(Math, data.map(function (d) {
    return Math.min.apply(Math, d.map(function (e) {
      return e.x;
    }));
  }));
  var maxY = Math.max.apply(Math, data.map(function (d) {
    return Math.max.apply(Math, d.map(function (e) {
      return e.y;
    }));
  })) * 1.25 || 10;
  var points = data.map(function (singlePlot) {
    return singlePlot.map(function (element) {
      var x = (element.x - minX) / (maxX - minX) * width + padding;
      var y = height - element.y / maxY * height + padding;
      return x + "," + y;
    }).join(' ');
  });

  var Axis = function Axis(_ref) {
    var points = _ref.points;
    return /*#__PURE__*/React__default.createElement("polyline", {
      fill: "solid",
      stroke: "#EDEDED",
      strokeWidth: "2",
      points: points,
      strokeLinecap: "round"
    });
  };

  var XAxis = function XAxis() {
    return /*#__PURE__*/React__default.createElement(Axis, {
      points: padding + "," + (height + 5) + " " + width + "," + (height + 5)
    });
  };

  var HorizontalGuides = function HorizontalGuides() {
    var startX = padding;
    var endX = width;
    var numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map(function (_, index) {
      var yRatio = maxY / numberOfHorizontalGuides;
      var ratio = (index + 1) / numberOfHorizontalGuides;
      var yCoordinate = height - height * ratio + padding;
      return /*#__PURE__*/React__default.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React__default.createElement("text", {
        key: index + "-text",
        x: startX,
        y: yCoordinate - 5,
        style: {
          fontSize: 10,
          fontFamily: 'Nunito',
          fill: colors[2],
          fontWeight: 'bold'
        }
      }, (index * yRatio + yRatio).toPrecision(2), " KW"), /*#__PURE__*/React__default.createElement("polyline", {
        key: index,
        fill: "none",
        stroke: "#ccc",
        strokeDasharray: "5 5",
        strokeLinecap: "round",
        strokeWidth: "1",
        points: startX + "," + yCoordinate + " " + endX + "," + yCoordinate
      }));
    });
  };

  var LabelsXAxis = function LabelsXAxis() {
    var y = height - padding + FONT_SIZE * 2;
    return data[0].map(function (element, index) {
      var x = (element.x - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
      return /*#__PURE__*/React__default.createElement("text", {
        key: index,
        x: x,
        y: y,
        style: {
          fill: '#ccc',
          fontSize: FONT_SIZE,
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }
      }, element.label);
    });
  };

  var handleVisible = function handleVisible(idx) {
    setVisible(function (prevState) {
      var newState = _extends({}, prevState);

      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "phase",
    style: {
      "float": 'right',
      marginBottom: '15px'
    }
  }, points.map(function (points, idx) {
    return /*#__PURE__*/React__default.createElement("a", {
      key: idx,
      style: {
        color: colors[idx],
        opacity: visible[idx] ? 1 : 0.5
      },
      onClick: function onClick(e) {
        return handleVisible(idx);
      }
    }, labels[idx]);
  })), /*#__PURE__*/React__default.createElement("svg", {
    viewBox: "0 0 " + width + " " + (height + 40)
  }, /*#__PURE__*/React__default.createElement("style", null, ".small {color: 'red'} "), /*#__PURE__*/React__default.createElement(XAxis, null), /*#__PURE__*/React__default.createElement(LabelsXAxis, null), /*#__PURE__*/React__default.createElement(HorizontalGuides, null), points.map(function (points, idx) {
    if (visible[idx]) {
      return /*#__PURE__*/React__default.createElement("polyline", {
        key: idx,
        fill: "none",
        stroke: colors[idx],
        strokeWidth: "3px",
        strokeLinecap: "round",
        strokeDasharray: "10 5",
        points: points
      });
    }
  })));
};

var BarChart = function BarChart(props) {
  var _ref;

  var height = props.height,
      width = props.width,
      padding = props.padding,
      data = props.data;
  if (!data) return null;
  var initialState2 = {};

  for (var key in data.data) {
    initialState2[key] = true;
  }

  var _useState = React.useState(initialState2),
      visible = _useState[0],
      setVisible = _useState[1];

  var colors = ['#55BDC8', '#304e62', '#ABABAB'];
  var FONT_SIZE = 12;
  var maxY = Math.max.apply(Math, (_ref = []).concat.apply(_ref, Object.values(data.data)));

  if (maxY < 1) {
    maxY = 1;
  }

  var xValues = Math.max.apply(Math, Object.keys(data.data).map(function (key, idx) {
    return data.data[key].length;
  }));
  var deltaX = (width - 50) / xValues;
  var points = Object.values(data.data).map(function (series) {
    return series.map(function (point, idx) {
      return [50 + deltaX * idx + 8, height - point / maxY * height];
    });
  });

  var Axis = function Axis(_ref2) {
    var points = _ref2.points;
    return /*#__PURE__*/React__default.createElement("polyline", {
      fill: "solid",
      stroke: "#EDEDED",
      strokeWidth: "2",
      points: points,
      strokeLinecap: "round"
    });
  };

  var XAxis = function XAxis() {
    return /*#__PURE__*/React__default.createElement(Axis, {
      points: padding + "," + (height + 5) + " " + width + "," + (height + 5)
    });
  };

  var HorizontalGuides = function HorizontalGuides() {
    var startX = padding;
    var endX = width;
    var numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map(function (_, index) {
      var yRatio = maxY / numberOfHorizontalGuides;
      var ratio = (index + 1) / numberOfHorizontalGuides;
      var yCoordinate = height - height * ratio + padding;
      return /*#__PURE__*/React__default.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React__default.createElement("text", {
        key: index + "-text",
        x: startX,
        y: yCoordinate - 5,
        style: {
          fontSize: 10,
          fontFamily: 'Nunito',
          fill: colors[2]
        }
      }, (index * yRatio + yRatio).toPrecision(2), " KW"), /*#__PURE__*/React__default.createElement("polyline", {
        key: index,
        fill: "none",
        stroke: "#EDEDED",
        strokeDasharray: "3 3",
        strokeLinecap: "round",
        strokeWidth: "1",
        points: startX + "," + yCoordinate + " " + endX + "," + yCoordinate
      }));
    });
  };

  var LabelsXAxis = function LabelsXAxis() {
    var y = height - padding + FONT_SIZE * 2;
    return data.labels.map(function (element, index) {
      var x = (index - 0) / (12.7 - 0) * width + 65 - FONT_SIZE / 2;
      return /*#__PURE__*/React__default.createElement("text", {
        key: index,
        x: x,
        y: y,
        style: {
          fill: '#ccc',
          fontSize: FONT_SIZE,
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }
      }, element);
    });
  };

  var handleVisible = function handleVisible(idx) {
    setVisible(function (prevState) {
      var newState = _extends({}, prevState);

      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "phase",
    style: {
      "float": 'right',
      marginBottom: '15px'
    }
  }, Object.keys(data.data).map(function (key, idx) {
    return /*#__PURE__*/React__default.createElement("a", {
      key: idx,
      style: {
        color: colors[idx],
        opacity: visible[key] ? 1 : 0.5
      },
      onClick: function onClick(e) {
        return handleVisible(key);
      }
    }, key);
  })), /*#__PURE__*/React__default.createElement("svg", {
    viewBox: "0 0 " + width + " " + (height + 40)
  }, /*#__PURE__*/React__default.createElement("style", null, ".small {color: 'red'} "), /*#__PURE__*/React__default.createElement(XAxis, null), /*#__PURE__*/React__default.createElement(LabelsXAxis, null), /*#__PURE__*/React__default.createElement(HorizontalGuides, null), points.map(function (series, idx) {
    if (visible[Object.keys(data.data)[idx]]) {
      return series.map(function (point, idxline) {
        return /*#__PURE__*/React__default.createElement("line", {
          key: idxline,
          x1: point[0] + idx * 14,
          y1: point[1] - (height - 3) < 0 ? point[1] + 5 : point[1] - 4,
          x2: point[0] + idx * 14,
          y2: height - 3,
          stroke: colors[idx],
          strokeWidth: "9.5",
          strokeLinecap: "round"
        });
      });
    }

    return null;
  })));
};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.BarChart = BarChart;
exports.Button = Button;
exports.ExampleComponent = ExampleComponent;
exports.Input = Input;
exports.LineChart = LineChart;
//# sourceMappingURL=index.js.map
