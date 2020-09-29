import React, { useState, Fragment } from 'react';

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

const LineChart = props => {
  const {
    height,
    width,
    padding,
    data,
    labels
  } = props;
  if (!data) return null;
  const initialState2 = {};
  data.forEach((data, idx) => initialState2[idx] = true);
  const [visible, setVisible] = useState(initialState2);
  const colors = ['#304e62', '#55bcc8', '#ABABAB', '#304e62', '#55bcc8', '#ABABAB'];
  const FONT_SIZE = 12;
  const maxX = Math.max(...data.map(d => Math.max(...d.map(e => e.x))));
  const minX = Math.min(...data.map(d => Math.min(...d.map(e => e.x))));
  const maxY = Math.max(...data.map(d => Math.max(...d.map(e => e.y)))) * 1.25 || 10;
  const points = data.map(singlePlot => singlePlot.map(element => {
    const x = (element.x - minX) / (maxX - minX) * width + padding;
    const y = height - element.y / maxY * height + padding;
    return `${x},${y}`;
  }).join(' '));

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
    points: `${padding},${height + 5} ${width},${height + 5}`
  });

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width;
    const numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const yRatio = maxY / numberOfHorizontalGuides;
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const yCoordinate = height - height * ratio + padding;
      return /*#__PURE__*/React.createElement(Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement("text", {
        key: `${index}-text`,
        x: startX,
        y: yCoordinate - 5,
        style: {
          fontSize: 10,
          fontFamily: 'Nunito',
          fill: colors[2],
          fontWeight: 'bold'
        }
      }, (index * yRatio + yRatio).toPrecision(2), " KW"), /*#__PURE__*/React.createElement("polyline", {
        key: index,
        fill: "none",
        stroke: "#ccc",
        strokeDasharray: "5 5",
        strokeLinecap: "round",
        strokeWidth: "1",
        points: `${startX},${yCoordinate} ${endX},${yCoordinate}`
      }));
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;
    return data[0].map((element, index) => {
      const x = (element.x - minX) / (maxX - minX) * width + 10 - FONT_SIZE / 2;
      return /*#__PURE__*/React.createElement("text", {
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
  }, points.map((points, idx) => /*#__PURE__*/React.createElement("a", {
    key: idx,
    style: {
      color: colors[idx],
      opacity: visible[idx] ? 1 : 0.5
    },
    onClick: e => handleVisible(idx)
  }, labels[idx]))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height + 40}`
  }, /*#__PURE__*/React.createElement("style", null, `.small {color: 'red'} `), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), points.map((points, idx) => {
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
  let maxY = Math.max(...[].concat(...Object.values(data.data)));

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
    points: `${padding},${height + 5} ${width},${height + 5}`
  });

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width;
    const numberOfHorizontalGuides = 5;
    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const yRatio = maxY / numberOfHorizontalGuides;
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const yCoordinate = height - height * ratio + padding;
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
      }, (index * yRatio + yRatio).toPrecision(2), " KW"), /*#__PURE__*/React.createElement("polyline", {
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
    viewBox: `0 0 ${width} ${height + 40}`
  }, /*#__PURE__*/React.createElement("style", null, `.small {color: 'red'} `), /*#__PURE__*/React.createElement(XAxis, null), /*#__PURE__*/React.createElement(LabelsXAxis, null), /*#__PURE__*/React.createElement(HorizontalGuides, null), points.map((series, idx) => {
    if (visible[Object.keys(data.data)[idx]]) {
      return series.map((point, idxline) => {
        return /*#__PURE__*/React.createElement("line", {
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

const ExampleComponent = ({
  text
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { BarChart, Button, ExampleComponent, Input, LineChart };
//# sourceMappingURL=index.modern.js.map
