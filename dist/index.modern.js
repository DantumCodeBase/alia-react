import React, { useState, Fragment } from 'react';

var styles = {"test":"_3ybTi"};

var Input = function Input() {
  return /*#__PURE__*/React.createElement("input", {
    className: "alia-input"
  });
};

var Button = function Button(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("button", {
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

  var _useState = useState(initialState2),
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
  var maxValue = Math.max.apply(Math, data.map(function (d) {
    return Math.max.apply(Math, d.map(function (e) {
      return e.y;
    }));
  })) * 1.25;
  var maxZeros = Math.pow(10, maxValue.toFixed().toString().length - 1);
  var maxY = Math.ceil(maxValue / maxZeros) * maxZeros;
  var minValue = Math.min.apply(Math, data.map(function (d) {
    return Math.min.apply(Math, d.map(function (e) {
      return e.y;
    }));
  })) * 1.25;
  var minZeros = Math.pow(10, Math.abs(minValue).toFixed().toString().length - 1);
  var minY = Math.floor(minValue / minZeros) * minZeros;
  var points = data.map(function (singlePlot) {
    return singlePlot.map(function (element) {
      var x = (element.x - minX) / (maxX - minX) * width + padding;
      var y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
      return x + "," + y;
    }).join(' ');
  });

  var Axis = function Axis(_ref) {
    var points = _ref.points,
        _ref$stroke = _ref.stroke,
        stroke = _ref$stroke === void 0 ? '#EDEDED' : _ref$stroke;
    return /*#__PURE__*/React.createElement("polyline", {
      fill: "solid",
      stroke: stroke,
      strokeWidth: "1",
      points: points,
      strokeLinecap: "round"
    });
  };

  var XAxis = function XAxis() {
    var zeroY = height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
    return /*#__PURE__*/React.createElement(Axis, {
      stroke: "#a0a0a0",
      points: padding + "," + zeroY + " " + width + "," + zeroY
    });
  };

  var HorizontalGuides = function HorizontalGuides() {
    var startX = padding;
    var endX = width;
    var numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides - 1).fill(0).map(function (_, index) {
      var yRatio = Math.abs(maxY - minY) / numberOfHorizontalGuides;
      var ratio = (index + 1) / numberOfHorizontalGuides;
      var displayNumber = index * yRatio + yRatio + minY;
      var yCoordinate = height - height * ratio + padding;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement("text", {
        key: index + "-text",
        x: startX,
        y: displayNumber >= 0 ? yCoordinate - 5 : yCoordinate + 15,
        style: {
          fontSize: 14,
          fontFamily: 'Nunito',
          fill: colors[2],
          fontWeight: 'bold'
        }
      }, (index * yRatio + yRatio + minY).toPrecision(4), " KW"), /*#__PURE__*/React.createElement("polyline", {
        key: index,
        fill: "none",
        stroke: "#e0e0e0",
        strokeDasharray: "5 5",
        strokeLinecap: "round",
        strokeWidth: "1",
        points: startX + "," + yCoordinate + " " + endX + "," + yCoordinate
      }));
    });
  };

  var LabelsXAxis = function LabelsXAxis() {
    var y = height - padding + FONT_SIZE * 2 - Math.abs(minY) / Math.abs(maxY - minY) * height;
    return data[0].map(function (element, index) {
      var x = (element.x - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
      return /*#__PURE__*/React.createElement("text", {
        key: index,
        x: x,
        y: y - 20,
        dominantBaseline: "central",
        textAnchor: "start",
        transform: "rotate(45, " + x + ", " + y + ")",
        style: {
          fill: '#a0a0a0',
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

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "phase",
    style: {
      "float": 'right',
      marginBottom: '15px'
    }
  }, points.map(function (points, idx) {
    return /*#__PURE__*/React.createElement("a", {
      key: idx,
      style: {
        color: colors[idx],
        opacity: visible[idx] ? 1 : 0.5
      },
      onClick: function onClick(e) {
        return handleVisible(idx);
      }
    }, labels[idx]);
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 " + width + " " + (height + 100)
  }, /*#__PURE__*/React.createElement("style", null, ".small {color: 'red'} "), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), points.map(function (points, idx) {
    if (visible[idx]) {
      return /*#__PURE__*/React.createElement("polyline", {
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

  var _useState = useState(initialState2),
      visible = _useState[0],
      setVisible = _useState[1];

  var colors = ['#55BDC8', '#304e62', '#ABABAB'];
  var FONT_SIZE = 12;
  var maxValue = Math.max.apply(Math, (_ref = []).concat.apply(_ref, Object.values(data.data)));
  var zeros = Math.pow(10, maxValue.toFixed().toString().length - 1);
  var maxY = Math.ceil(maxValue / zeros) * zeros;

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
    return /*#__PURE__*/React.createElement("polyline", {
      fill: "solid",
      stroke: "#EDEDED",
      strokeWidth: "2",
      points: points,
      strokeLinecap: "round"
    });
  };

  var XAxis = function XAxis() {
    return /*#__PURE__*/React.createElement(Axis, {
      points: padding + "," + (height + 36) + " " + width + "," + (height + 36)
    });
  };

  var HorizontalGuides = function HorizontalGuides() {
    var startX = padding;
    var endX = width;
    var numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map(function (_, index) {
      var yRatio = maxY / numberOfHorizontalGuides;
      var ratio = (index + 1) / numberOfHorizontalGuides;
      var yCoordinate = height - height * ratio + padding + 20;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement("text", {
        key: index + "-text",
        x: startX,
        y: yCoordinate - 5,
        style: {
          fontSize: 10,
          fontFamily: 'Nunito',
          fill: colors[2]
        }
      }, (index * yRatio + yRatio).toFixed(2), " kWh"), /*#__PURE__*/React.createElement("polyline", {
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
      return /*#__PURE__*/React.createElement("text", {
        key: index,
        x: x,
        y: y + 28,
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

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "phase",
    style: {
      "float": 'right',
      marginBottom: '15px'
    }
  }, Object.keys(data.data).map(function (key, idx) {
    return /*#__PURE__*/React.createElement("a", {
      key: idx,
      style: {
        color: colors[idx],
        opacity: visible[key] ? 1 : 0.5
      },
      onClick: function onClick(e) {
        return handleVisible(key);
      }
    }, key);
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 " + width + " " + (height + 60)
  }, /*#__PURE__*/React.createElement("style", null, ".small {color: 'red'} "), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), points.map(function (series, idx) {
    if (visible[Object.keys(data.data)[idx]]) {
      return series.map(function (point, idxline) {
        return /*#__PURE__*/React.createElement("line", {
          key: idxline,
          x1: point[0] + idx * 14,
          y1: point[1] + 25,
          x2: point[0] + idx * 14,
          y2: height + 25,
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
  return /*#__PURE__*/React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { BarChart, Button, ExampleComponent, Input, LineChart };
//# sourceMappingURL=index.modern.js.map
