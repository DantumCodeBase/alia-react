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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var LineChart = function LineChart(_ref) {
  var height = _ref.height,
      width = _ref.width,
      padding = _ref.padding,
      data = _ref.data,
      labels = _ref.labels,
      _ref$hourly = _ref.hourly,
      hourly = _ref$hourly === void 0 ? true : _ref$hourly;

  var _useState = useState(null),
      tooltipVisible = _useState[0],
      setTooltipVisible = _useState[1];

  if (!data) return null;
  var initialState2 = {};
  data.forEach(function (data, idx) {
    return initialState2[idx] = true;
  });

  var _useState2 = useState(initialState2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var colors = ['#55bcc8', '#304e62', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
  var colorsFill = ['#55bcc8', '#304e62', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
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
  var maxY = Math.ceil(maxValue / maxZeros) * maxZeros || 5;
  var minValue = Math.min.apply(Math, data.map(function (d) {
    return Math.min.apply(Math, d.map(function (e) {
      return e.y;
    }));
  })) * 1.25;
  var minZeros = Math.pow(10, Math.abs(minValue).toFixed().toString().length - 1);
  var minY = Math.floor(minValue / minZeros) * minZeros;
  var zeroY = height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height || 200;

  if (minY > 0) {
    minY = 0;
  }

  var points = data.map(function (singlePlot) {
    return singlePlot.map(function (element) {
      var x = (element.x - minX) / (maxX - minX) * width + padding;
      var y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
      return x + "," + y;
    }).join(' ');
  });
  var polygonPoints = data.map(function (singlePlot) {
    return "0," + zeroY + " " + singlePlot.map(function (element) {
      var x = (element.x - minX) / (maxX - minX) * width + padding;
      var y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
      return x + "," + y;
    }).join(' ') + (" " + width + "," + zeroY);
  });
  var pointsCoords = data.map(function (singlePlot, idx) {
    return singlePlot.map(function (element) {
      var x = (element.x - minX) / (maxX - minX) * width + padding;
      var y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
      return [x, y, element.y, idx, element.label];
    });
  });

  var Axis = function Axis(_ref2) {
    var points = _ref2.points,
        _ref2$stroke = _ref2.stroke,
        stroke = _ref2$stroke === void 0 ? '#EDEDED' : _ref2$stroke;
    return /*#__PURE__*/React.createElement("polyline", {
      fill: "solid",
      stroke: stroke,
      strokeWidth: "1",
      points: points,
      strokeLinecap: "round"
    });
  };

  var XAxis = function XAxis() {
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
        strokeDasharray: "1 5",
        strokeLinecap: "round",
        strokeWidth: "1",
        points: startX + "," + yCoordinate + " " + endX + "," + yCoordinate
      }));
    });
  };

  var labelsXAxisHourly = function labelsXAxisHourly() {
    var hours = [];
    var lastHour = null;
    var lastHalf = null;
    var lastX = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(data[0]), _step; !(_step = _iterator()).done;) {
      var element = _step.value;
      var currentHour = element.label.split(':')[0];
      var currentHalf = element.label.split(':')[1] > 20 && element.label.split(':')[1] < 40 ? 30 : null;

      if (lastHour != currentHour) {
        hours.push([lastX, lastHour + ":" + (lastHalf ? '30' : '00')]);
        lastHour = currentHour;
        lastHalf = currentHalf;
        lastX = element.x;
      }
    }

    return hours.slice(1);
  };

  var LabelsXAxis = function LabelsXAxis() {
    var y = height - padding + FONT_SIZE * 2 - Math.abs(minY) / Math.abs(maxY - minY) * height || 224;

    if (hourly) {
      var labelsPerHour = labelsXAxisHourly();
      return labelsPerHour.map(function (element, index) {
        var x = (element[0] - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
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
        }, element[1]);
      });
    }

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

  var Mark = function Mark(_ref3) {
    var coord = _ref3.coord,
        idx = _ref3.idx,
        onMouseOver = _ref3.onMouseOver,
        onMouseLeave = _ref3.onMouseLeave,
        _ref3$color = _ref3.color,
        color = _ref3$color === void 0 ? "red" : _ref3$color;
    return /*#__PURE__*/React.createElement("g", {
      key: "dot-" + idx,
      pointerEvents: "all",
      onMouseOver: onMouseOver,
      onMouseLeave: onMouseLeave
    }, /*#__PURE__*/React.createElement("circle", {
      cx: coord[0],
      cy: coord[1],
      r: "3",
      fill: color
    }));
  };

  var Tooltips = function Tooltips(_ref4) {
    var _ref4$x = _ref4.x,
        x = _ref4$x === void 0 ? 500 : _ref4$x,
        _ref4$y = _ref4.y,
        y = _ref4$y === void 0 ? 70 : _ref4$y,
        _ref4$label = _ref4.label,
        label = _ref4$label === void 0 ? "545.245 MW" : _ref4$label,
        _ref4$sublabel = _ref4.sublabel,
        sublabel = _ref4$sublabel === void 0 ? "3:24:02" : _ref4$sublabel;
    var rectPos = [x - 35, y - 40];
    var height = 25;
    var width = 50;
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: rectPos[0],
      y: rectPos[1],
      width: width + label.length * 4,
      height: height,
      rx: "15",
      fill: "#c0c0c0"
    }), /*#__PURE__*/React.createElement("text", {
      x: rectPos[0] + (width - label.length) / 3,
      y: rectPos[1] + height / 2,
      style: {
        fill: 'white',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        fontFamily: 'Nunito'
      }
    }, label), /*#__PURE__*/React.createElement("text", {
      x: rectPos[0] + (width - label.length) / 3,
      y: rectPos[1] + height / 2 + 10,
      style: {
        fill: 'white',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        fontFamily: 'Nunito'
      }
    }, sublabel));
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
  }, /*#__PURE__*/React.createElement("style", null, ".small {color: 'red'} .linear {backgroundColor:'blue'}"), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity_0",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[0],
    stopOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[0],
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[0],
    stopOpacity: "0.0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity_1",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[1],
    stopOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[1],
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[1],
    stopOpacity: "0.0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity_2",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[2],
    stopOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[2],
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[2],
    stopOpacity: "0.0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity_3",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[0],
    stopOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[0],
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[0],
    stopOpacity: "0.0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity_4",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[1],
    stopOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[1],
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[1],
    stopOpacity: "0.0"
  }))), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), polygonPoints.map(function (points, idx) {
    if (visible[idx]) {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("polygon", {
        points: points,
        fill: "url('#three_opacity_" + idx + "')"
      }));
    }
  }), points.map(function (points, idx) {
    if (visible[idx]) {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("polyline", {
        key: idx,
        fill: "none",
        stroke: colors[idx],
        strokeWidth: "3px",
        strokeLinecap: "round",
        strokeDasharray: "1",
        points: points
      }));
    }
  }), pointsCoords.map(function (coords, idxParent) {
    if (visible[idxParent]) {
      return coords.map(function (coord, idx) {
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Mark, {
          key: idx,
          coord: coord,
          idx: idx,
          color: colors[idxParent],
          onMouseOver: function onMouseOver() {
            return setTooltipVisible(coord[0] + "-" + coord[3]);
          },
          onMouseLeave: function onMouseLeave() {
            setTooltipVisible(null);
          }
        }));
      });
    }
  }), pointsCoords.map(function (coords, idx) {
    if (visible[idx]) {
      return coords.map(function (coord, idx) {
        var quantity = coord[2].toFixed(2);
        return /*#__PURE__*/React.createElement(Fragment, null, tooltipVisible == coord[0] + "-" + coord[3] && /*#__PURE__*/React.createElement(Tooltips, {
          key: idx,
          x: coord[0],
          y: coord[1],
          label: quantity + " kW",
          sublabel: coord[4]
        }));
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
