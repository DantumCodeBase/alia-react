import React, { Fragment, useState } from 'react'
import './LineChart.scss'

export const LineChart = (props) => {
  const { height, width, padding, data, labels } = props

  if (!data) return null

  const initialState2 = {}
  data.forEach((data, idx) => (initialState2[idx] = true))

  const [visible, setVisible] = useState(initialState2)

  const colors = [
    '#304e62',
    '#55bcc8',
    '#ABABAB',
    '#304e62',
    '#55bcc8',
    '#ABABAB'
  ]
  const FONT_SIZE = 12

  const maxX = Math.max(...data.map((d) => Math.max(...d.map((e) => e.x))))
  const minX = Math.min(...data.map((d) => Math.min(...d.map((e) => e.x))))

  const maxY = Math.max(...data.map((d) => Math.max(...d.map((e) => e.y)))) * 1.25 || 10;
  const minY = Math.min(...data.map((d) => Math.min(...d.map((e) => e.y)))) * 1.25 || 10;

  const points = data.map((singlePlot) =>
    singlePlot
      .map((element) => {
        // Calculate coordinates
        const x = ((element.x - minX) / (maxX - minX)) * width + padding
        const y = height - (element.y / maxY) * height + padding
        return `${x},${y}`
      })
      .join(' ')
  )

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
              fill: colors[2],
              fontWeight: 'bold'
            }}
          >
            {(index * yRatio + yRatio).toPrecision(2)} KW
          </text>
          <polyline
            key={index}
            fill='none'
            stroke='#ccc'
            strokeDasharray='5 5'
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

    return data[0].map((element, index) => {
      const x =
        ((element.x - minX) / (maxX - minX)) * width + 10 - FONT_SIZE / 2

      return (
        <text
          key={index}
          x={x}
          y={y}
          dominantBaseline='central'
          textAnchor='start'
          transform={`rotate(45, ${x}, ${y})`}
          style={{
            fill: '#ccc',
            fontSize: FONT_SIZE,
            fontWeight: 'bold',
            fontFamily: 'Nunito'
          }}
        >
          {element.label}
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
        {points.map((points, idx) => (
          <a
            key={idx}
            style={{ color: colors[idx], opacity: visible[idx] ? 1 : 0.5 }}
            onClick={(e) => handleVisible(idx)}
          >
            {labels[idx]}
          </a>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height + 100}`}>
        <style>{`.small {color: 'red'} `}</style>

        <XAxis />
        <LabelsXAxis />
        {/* <YAxis /> */}
        <HorizontalGuides />
        {points.map((points, idx) => {
          if (visible[idx]) {
            return (
              <polyline
                key={idx}
                fill='none'
                stroke={colors[idx]}
                strokeWidth='3px'
                strokeLinecap='round'
                strokeDasharray='10 5'
                points={points}
              />
            )
          }
        })}
      </svg>
    </>
  )
}
