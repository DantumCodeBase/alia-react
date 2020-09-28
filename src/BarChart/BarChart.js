import React, { Fragment, useState } from 'react'
import './BarChart.scss'

export const BarChart = (props) => {
  const { height, width, padding, data } = props

  if (!data) return null

  const initialState2 = {}
  for (const key in data.data) {
    initialState2[key] = true
  }

  const [visible, setVisible] = useState(initialState2)
  // console.log(visible)
  const colors = ['#55BDC8', '#304e62', '#ABABAB']
  const FONT_SIZE = 12

  let maxY = Math.max(...[].concat(...Object.values(data.data)))

  if (maxY < 1) {
    maxY = 1
  }

  const xValues = Math.max(
    ...Object.keys(data.data).map((key, idx) => data.data[key].length)
  )

  const deltaX = (width - 50) / xValues
  // console.log(deltaX)
  // console.log(maxY)
  // generate [[[[x,y], [x,y]],[xy, xy]], []]
  const points = Object.values(data.data).map((series) => {
    return series.map((point, idx) => [
      50 + deltaX * idx + 8,
      height - (point / maxY) * height
    ])
  })

  const Axis = ({ points }) => (
    <polyline
      fill='solid'
      stroke='#EDEDED'
      strokeWidth='2'
      points={points}
      strokeLinecap='round'
    />
  )

  const XAxis = () => (
    <Axis points={`${padding},${height + 5} ${width},${height + 5}`} />
  )

  const HorizontalGuides = () => {
    const startX = padding
    const endX = width
    const numberOfHorizontalGuides = 5

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const yRatio = maxY / numberOfHorizontalGuides
      const ratio = (index + 1) / numberOfHorizontalGuides

      const yCoordinate = height - height * ratio + padding

      return (
        <Fragment key={index}>
          <text
            key={`${index}-text`}
            x={startX}
            y={yCoordinate - 5}
            style={{
              fontSize: 10,
              fontFamily: 'Nunito',
              fill: colors[2]
            }}
          >
            {(index * yRatio + yRatio).toPrecision(2)} KW
          </text>
          <polyline
            key={index}
            fill='none'
            stroke='#EDEDED'
            strokeDasharray='3 3'
            strokeLinecap='round'
            strokeWidth='1'
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </Fragment>
      )
    })
  }

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2

    return data.labels.map((element, index) => {
      const x =
        ((index - 0) / (12.7 - 0)) * width + 65 - FONT_SIZE / 2

      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: '#ccc',
            fontSize: FONT_SIZE,
            fontWeight: 'bold',
            fontFamily: 'Nunito'
          }}
        >
          {element}
        </text>
      )
    })
  }
  // const YAxis = () => (
  //   <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  // )

  const handleVisible = (idx) => {
    setVisible((prevState) => {
      const newState = { ...prevState }
      newState[idx] = !newState[idx]
      return newState
    })
  }

  return (
    <>
      <div className='phase' style={{ float: 'right', marginBottom: '15px' }}>
        {Object.keys(data.data).map((key, idx) => (
          <a
            key={idx}
            style={{ color: colors[idx], opacity: visible[key] ? 1 : 0.5 }}
            onClick={(e) => handleVisible(key)}
          >
            {key}
          </a>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height + 40}`}>
        <style>{`.small {color: 'red'} `}</style>

        <XAxis />
        <LabelsXAxis />
        {/* <YAxis /> */}
        <HorizontalGuides />
        {points.map((series, idx) => {
          if (visible[Object.keys(data.data)[idx]]) {
            return series.map((point, idxline) => {
              // <polyline
              //   key={idx}
              //   fill='none'
              //   stroke={colors[idx]}
              //   strokeWidth='3px'
              //   strokeLinecap='round'
              //   strokeDasharray='10 5'
              //   points={points}
              // />
              return (
                <line
                  key={idxline}
                  x1={point[0] + idx * 14}
                  y1={point[1] - (height - 3) < 0 ? point[1] + 5 : point[1] - 4}
                  x2={point[0] + idx * 14}
                  y2={height - 3}
                  stroke={colors[idx]}
                  strokeWidth='9.5'
                  strokeLinecap='round'
                />
              )
            })
          }
          return null
        })}
      </svg>
    </>
  )
}
