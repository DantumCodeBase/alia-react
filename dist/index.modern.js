import React, { useState, useRef, Fragment } from 'react';

var styles = {"test":"_styles-module__test__3ybTi"};

const Input = () => {
  return /*#__PURE__*/React.createElement("input", {
    className: "alia-input"
  });
};

const Button = ({
  type: _type = 'button',
  children
}) => {
  return /*#__PURE__*/React.createElement("button", {
    type: _type,
    className: "d-button"
  }, children);
};

const LineChart = ({
  height,
  width,
  padding,
  data,
  labels,
  hourly: _hourly = true
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [currentX, setCurrentX] = useState(0);
  const div = useRef();
  if (!data) return null;
  const initialState2 = {};
  data.forEach((data, idx) => initialState2[idx] = true);
  const [visible, setVisible] = useState(initialState2);
  const colors = ['#55bcc8', '#304e62', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
  const colorsFill = ['#55bcc8', '#304e62', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
  const FONT_SIZE = 12;
  const maxX = Math.max(...data.map(d => Math.max(...d.map(e => e.x))));
  const minX = Math.min(...data.map(d => Math.min(...d.map(e => e.x))));
  const maxValue = Math.max(...data.map(d => Math.max(...d.map(e => e.y)))) * 1.25;
  const maxZeros = 10 ** (maxValue.toFixed().toString().length - 1);
  const maxY = Math.ceil(maxValue / maxZeros) * maxZeros || 5;
  const minValue = Math.min(...data.map(d => Math.min(...d.map(e => e.y)))) * 1.25;
  const minZeros = 10 ** (Math.abs(minValue).toFixed().toString().length - 1);
  let minY = Math.floor(minValue / minZeros) * minZeros;
  let zeroY = 200;

  if (minY < 0) {
    zeroY = height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height || 200;
  }

  if (minY > 0) {
    minY = 0;
  }

  const points = data.map(singlePlot => singlePlot.map(element => {
    const x = (element.x - minX) / (maxX - minX) * width + padding;
    const y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
    return `${x},${y}`;
  }).join(' '));
  const polygonPoints = data.map(singlePlot => `0,${200} ` + singlePlot.map(element => {
    const x = (element.x - minX) / (maxX - minX) * width + padding;
    const y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
    return `${x},${y}`;
  }).join(' ') + ` ${width},${200}`);
  const pointsCoords = data.map((singlePlot, idx) => singlePlot.map(element => {
    const x = (element.x - minX) / (maxX - minX) * width + padding;
    const y = height - element.y / Math.abs(maxY - minY) * height + padding - Math.abs(minY) / Math.abs(maxY - minY) * height;
    return [x, y, element.y, idx, element.label];
  }));
  const xPointCoords = data.map((singlePlot, idx) => singlePlot.map(element => {
    const x = (element.x - minX) / (maxX - minX) * width + padding;
    return x;
  }));

  const VerticalCurrentX = ({
    x,
    stroke: _stroke = '#a0a0a0'
  }) => {
    return /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: "0",
      x2: x,
      y2: height,
      fill: "solid",
      stroke: _stroke,
      strokeDasharray: "5 5",
      strokeLinecap: "round",
      strokeWidth: "2"
    });
  };

  const Axis = ({
    points,
    stroke: _stroke2 = '#EDEDED'
  }) => /*#__PURE__*/React.createElement("polyline", {
    fill: "solid",
    stroke: _stroke2,
    strokeWidth: "1",
    points: points,
    strokeLinecap: "round"
  });

  const XAxis = () => {
    return /*#__PURE__*/React.createElement(Axis, {
      stroke: "#a0a0a0",
      strokeLinecap: "round",
      points: `${padding},${zeroY} ${width},${zeroY}`
    });
  };

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width;
    const numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides - 1).fill(0).map((_, index) => {
      const yRatio = Math.abs(maxY - minY) / numberOfHorizontalGuides;
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const displayNumber = index * yRatio + yRatio + minY;
      const yCoordinate = height - height * ratio + padding;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement("text", {
        key: `${index}-text`,
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
        points: `${startX},${yCoordinate} ${endX},${yCoordinate}`
      }));
    });
  };

  const labelsXAxisHourly = () => {
    const hours = [];
    let lastHour = null;
    let lastHalf = null;
    let lastX = 0;

    for (let element of data[0]) {
      const currentHour = element.label.split(':')[0];
      const currentHalf = element.label.split(':')[1] > 20 && element.label.split(':')[1] < 40 ? 30 : null;

      if (lastHour != currentHour) {
        hours.push([lastX, `${lastHour}:${lastHalf ? '30' : '00'}`]);
        lastHour = currentHour;
        lastHalf = currentHalf;
        lastX = element.x;
      }
    }

    return hours.slice(1);
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2 - Math.abs(minY) / Math.abs(maxY - minY) * height || 224;

    if (_hourly) {
      const labelsPerHour = labelsXAxisHourly();
      return labelsPerHour.map((element, index) => {
        const x = (element[0] - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
        return /*#__PURE__*/React.createElement("text", {
          key: index,
          x: x,
          y: y - 20,
          dominantBaseline: "central",
          textAnchor: "start",
          transform: `rotate(45, ${x}, ${y})`,
          style: {
            fill: '#a0a0a0',
            fontSize: FONT_SIZE,
            fontWeight: 'bold',
            fontFamily: 'Nunito'
          }
        }, element[1]);
      });
    }

    return data[0].map((element, index) => {
      const x = (element.x - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
      return /*#__PURE__*/React.createElement("text", {
        key: index,
        x: x,
        y: y - 20,
        dominantBaseline: "central",
        textAnchor: "start",
        transform: `rotate(45, ${x}, ${y})`,
        style: {
          fill: '#a0a0a0',
          fontSize: FONT_SIZE,
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }
      }, element.label);
    });
  };

  const handleVisible = idx => {
    setVisible(prevState => {
      const newState = { ...prevState
      };
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  const Mark = ({
    coord,
    idx,
    onMouseOver,
    onMouseLeave,
    color: _color = "red"
  }) => {
    return /*#__PURE__*/React.createElement("g", {
      key: `dot-${idx}`,
      pointerEvents: "all"
    }, /*#__PURE__*/React.createElement("circle", {
      key: `circle-${idx}`,
      cx: coord[0],
      cy: coord[1],
      r: "5",
      fill: tooltipVisible === `${coord[0]}-${coord[3]}` ? colorsFill[0] : 'none'
    }), /*#__PURE__*/React.createElement("circle", {
      key: `circlecontour-${idx}`,
      onMouseOver: onMouseOver,
      onMouseLeave: onMouseLeave,
      cx: coord[0],
      cy: coord[1],
      r: "10",
      fill: "none",
      strokeWidth: "2",
      stroke: tooltipVisible === `${coord[0]}-${coord[3]}` ? colorsFill[0] : 'none'
    }), /*#__PURE__*/React.createElement("polygon", {
      fill: tooltipVisible === `${coord[0]}-${coord[3]}` ? colorsFill[0] : 'none',
      points: `${coord[0] + 15} ${coord[1] - 5}, ${coord[0] + 20} ${coord[1] + 0}, ${coord[0] + 15} ${coord[1] + 5}`
    }), /*#__PURE__*/React.createElement("polygon", {
      fill: tooltipVisible === `${coord[0]}-${coord[3]}` ? colorsFill[0] : 'none',
      points: `${coord[0] - 15} ${coord[1] - 5}, ${coord[0] - 20} ${coord[1] + 0}, ${coord[0] - 15} ${coord[1] + 5}`
    }));
  };

  const Tooltips = ({
    x: _x = 500,
    y: _y = 70,
    label: _label = "545.245 MW",
    sublabel: _sublabel = "3:24:02"
  }) => {
    const rectPos = [_x - 35, _y - 40];
    const height = 25;
    const width = 50;
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: rectPos[0],
      y: rectPos[1],
      width: width + _label.length * 4,
      height: height,
      rx: "15",
      fill: "#c0c0c0"
    }), /*#__PURE__*/React.createElement("text", {
      x: rectPos[0] + (width - _label.length) / 3,
      y: rectPos[1] + height / 2,
      style: {
        fill: 'white',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        fontFamily: 'Nunito'
      }
    }, _label), /*#__PURE__*/React.createElement("text", {
      x: rectPos[0] + (width - _label.length) / 3,
      y: rectPos[1] + height / 2 + 10,
      style: {
        fill: 'white',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        fontFamily: 'Nunito'
      }
    }, _sublabel));
  };

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "phase",
    style: {
      float: 'right',
      marginBottom: '15px'
    }
  }, points.map((points, idx) => /*#__PURE__*/React.createElement("a", {
    key: idx,
    style: {
      color: colors[idx],
      opacity: visible[idx] ? 1 : 0.5
    },
    onClick: e => handleVisible(idx)
  }, labels[idx]))), /*#__PURE__*/React.createElement("svg", {
    id: "graphcontainer",
    viewBox: `0 0 ${width} ${height + 100}`,
    onMouseMove: event => {
      const rect = document.getElementById('graphcontainer').getBoundingClientRect();
      const coordX = (event.clientX - rect.x) / rect.width * width;
      let curr = xPointCoords[0][0];

      for (let x of xPointCoords[0]) {
        if (Math.abs(x - coordX) < Math.abs(curr - coordX)) {
          curr = x;
        }
      }

      const coord = pointsCoords.map(coords => coords.filter(coord => coord[0] === curr))[0][0];
      setCurrentX(curr);
      setTooltipVisible(`${coord[0]}-${coord[3]}`);
    }
  }, /*#__PURE__*/React.createElement("style", null, `.small {color: 'red'} .linear {backgroundColor:'blue'}`), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "three_opacity",
    gradientTransform: "rotate(90)"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colorsFill[0],
    stopOpacity: "0.6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: colorsFill[0],
    stopOpacity: "0.1"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colorsFill[0],
    stopOpacity: "0.0"
  }))), currentX && /*#__PURE__*/React.createElement(VerticalCurrentX, {
    x: currentX
  }), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), polygonPoints.map((points, idx) => {
    if (visible[idx]) {
      return /*#__PURE__*/React.createElement("polygon", {
        key: idx,
        points: points,
        fill: `url('#three_opacity')`
      });
    }
  }), points.map((points, idx) => {
    if (visible[idx]) {
      return /*#__PURE__*/React.createElement("polyline", {
        key: idx,
        fill: "none",
        stroke: colors[idx],
        strokeWidth: "3px",
        strokeLinecap: "round",
        strokeDasharray: "1",
        points: points
      });
    }
  }), pointsCoords.map((coords, idxParent) => {
    if (visible[idxParent]) {
      return coords.map((coord, idx) => {
        return /*#__PURE__*/React.createElement(Mark, {
          key: idx,
          coord: coord,
          idx: idx,
          color: colors[idxParent]
        });
      });
    }
  }), pointsCoords.map((coords, idx) => {
    if (visible[idx]) {
      return coords.map((coord, idx) => {
        const quantity = coord[2].toFixed(2);
        return tooltipVisible == `${coord[0]}-${coord[3]}` && /*#__PURE__*/React.createElement(Tooltips, {
          key: idx,
          x: coord[0],
          y: coord[1],
          label: `${quantity} kW`,
          sublabel: coord[4]
        });
      });
    }
  })));
};

const BarChart = props => {
  const {
    height,
    width,
    padding,
    data
  } = props;
  if (!data) return null;
  const initialState2 = {};

  for (const key in data.data) {
    initialState2[key] = true;
  }

  const [visible, setVisible] = useState(initialState2);
  const colors = ['#55BDC8', '#304e62', '#ABABAB'];
  const FONT_SIZE = 12;
  const maxValue = Math.max(...[].concat(...Object.values(data.data)));
  const zeros = 10 ** (maxValue.toFixed().toString().length - 1);
  let maxY = Math.ceil(maxValue / zeros) * zeros;

  if (maxY < 1) {
    maxY = 1;
  }

  const xValues = Math.max(...Object.keys(data.data).map((key, idx) => data.data[key].length));
  const deltaX = (width - 50) / xValues;
  const points = Object.values(data.data).map(series => {
    return series.map((point, idx) => [50 + deltaX * idx + 8, height - point / maxY * height]);
  });

  const Axis = ({
    points
  }) => /*#__PURE__*/React.createElement("polyline", {
    fill: "solid",
    stroke: "#EDEDED",
    strokeWidth: "2",
    points: points,
    strokeLinecap: "round"
  });

  const XAxis = () => /*#__PURE__*/React.createElement(Axis, {
    points: `${padding},${height + 36} ${width},${height + 36}`
  });

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width;
    const numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const yRatio = maxY / numberOfHorizontalGuides;
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const yCoordinate = height - height * ratio + padding + 20;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement("text", {
        key: `${index}-text`,
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
        points: `${startX},${yCoordinate} ${endX},${yCoordinate}`
      }));
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;
    return data.labels.map((element, index) => {
      const x = (index - 0) / (12.7 - 0) * width + 65 - FONT_SIZE / 2;
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

  const handleVisible = idx => {
    setVisible(prevState => {
      const newState = { ...prevState
      };
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "phase",
    style: {
      float: 'right',
      marginBottom: '15px'
    }
  }, Object.keys(data.data).map((key, idx) => /*#__PURE__*/React.createElement("a", {
    key: idx,
    style: {
      color: colors[idx],
      opacity: visible[key] ? 1 : 0.5
    },
    onClick: e => handleVisible(key)
  }, key))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height + 60}`
  }, /*#__PURE__*/React.createElement("style", null, `.small {color: 'red'} `), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), points.map((series, idx) => {
    if (visible[Object.keys(data.data)[idx]]) {
      return series.map((point, idxline) => {
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

const ExampleComponent = ({
  text
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { BarChart, Button, ExampleComponent, Input, LineChart };
//# sourceMappingURL=index.modern.js.map
