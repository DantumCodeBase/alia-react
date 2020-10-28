import React, { Fragment, useState } from 'react'
import Tooltip from '../Tooltip'
import './LineChart.scss'

export const LineChart = ({ height, width, padding, data, labels, hourly=true }) => {
  const [tooltipVisible, setTooltipVisible] = useState(null)

  if (!data) return null

  const initialState2 = {}
  data.forEach((data, idx) => (initialState2[idx] = true))

  const [visible, setVisible] = useState(initialState2)

  const colors = [
    '#55bcc8',
    '#304e62',
    '#ABABAB',
    '#304e62',
    '#55bcc8',
    '#ABABAB'
  ]

  const colorsFill = [
    '#55bcc8',
    '#304e62',
    '#ABABAB',
    '#304e62',
    '#55bcc8',
    '#ABABAB'
  ]
  const FONT_SIZE = 12

  const maxX = Math.max(...data.map((d) => Math.max(...d.map((e) => e.x))))
  const minX = Math.min(...data.map((d) => Math.min(...d.map((e) => e.x))))

  const maxValue = Math.max(...data.map((d) => Math.max(...d.map((e) => e.y)))) * 1.25;
  const maxZeros = 10 ** (maxValue.toFixed().toString().length - 1)
  const maxY = (Math.ceil(maxValue / maxZeros) * maxZeros) || 5

  const minValue = Math.min(...data.map((d) => Math.min(...d.map((e) => e.y)))) * 1.25;
  const minZeros = 10 ** (Math.abs(minValue).toFixed().toString().length - 1)
  let minY = (Math.floor(minValue / minZeros) * minZeros)
  const zeroY = height + padding - Math.abs(minY)/ Math.abs(maxY - minY)*height || 200;
  if (minY > 0){
    minY = 0
  }
  

  const points = data.map((singlePlot) =>
    singlePlot
      .map((element) => {
        // Calculate coordinates
        const x = ((element.x - minX) / (maxX - minX)) * width + padding
        const y = height - (element.y / Math.abs(maxY - minY)) * height + padding - Math.abs(minY)/ Math.abs(maxY - minY)*height 
        return `${x},${y}`
      })
      .join(' ')
  )

  const polygonPoints = data.map((singlePlot) =>
    (`0,${zeroY} ` +  singlePlot
      .map((element) => {
        // Calculate coordinates
        const x = ((element.x - minX) / (maxX - minX)) * width + padding
        const y = height - (element.y / Math.abs(maxY - minY)) * height + padding - Math.abs(minY)/ Math.abs(maxY - minY)*height 
        return `${x},${y}`
      })
      .join(' ') + ` ${width},${zeroY}`) 
  )


  const pointsCoords = data.map((singlePlot, idx) =>
    singlePlot
      .map((element) => {
        // Calculate coordinates
        const x = ((element.x - minX) / (maxX - minX)) * width + padding
        const y = height - (element.y / Math.abs(maxY - minY)) * height + padding - Math.abs(minY)/ Math.abs(maxY - minY)*height 
        
        return [x, y, element.y, idx, element.label]
      })
  )
  
  const Axis = ({ points, stroke='#EDEDED' }) => (
    <polyline
      fill='solid'
      stroke={stroke}
      strokeWidth='1'
      points={points}
      strokeLinecap='round'
    />
  )

  const XAxis = () => {
    

    return (<Axis stroke='#a0a0a0' points={`${padding},${zeroY} ${width},${zeroY}`} />);

  }



  const HorizontalGuides = () => {
    const startX = padding
    const endX = width
    const numberOfHorizontalGuides = 5

    return new Array(numberOfHorizontalGuides -1).fill(0).map((_, index) => {
      const yRatio = Math.abs(maxY-minY) / numberOfHorizontalGuides
      const ratio = (index + 1) / numberOfHorizontalGuides
      const displayNumber = index * yRatio + yRatio + minY;
      const yCoordinate = height - height * ratio + padding

      return (
        <Fragment key={index}>
          <text
            key={`${index}-text`}
            x={startX}
            y={ displayNumber>=0 ? (yCoordinate - 5) : (yCoordinate + 15) }
            style={{
              fontSize: 14,
              fontFamily: 'Nunito',
              fill: colors[2],
              fontWeight: 'bold'
            }}
          >
            {(index * yRatio + yRatio + minY ).toPrecision(4)} KW
          </text>
          <polyline
            key={index}
            fill='none'
            stroke='#e0e0e0'
            strokeDasharray='1 5'
            strokeLinecap='round'
            strokeWidth='1'
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </Fragment>
      )
    })
  }


  const labelsXAxisHourly = () => {
    const hours = []

    let lastHour = null
    let lastHalf = null
    let lastX = 0
    for(let element of data[0]){
      const currentHour = element.label.split(':')[0]
      const currentHalf = (element.label.split(':')[1] > 20 && element.label.split(':')[1] < 40) ? 30 : null
      if(lastHour != currentHour){
        hours.push([lastX, `${lastHour}:${lastHalf ? '30':'00'}`])
        lastHour = currentHour
        lastHalf = currentHalf
        lastX = element.x
      } 


    }
  
    return hours.slice(1)
  }


  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2 - Math.abs(minY)/Math.abs(maxY-minY)*height || 224;


    if(hourly){
        const labelsPerHour = labelsXAxisHourly()
        return labelsPerHour.map((element, index) => {
            const x =
            ((element[0] - minX) / (maxX - minX)) * width + 10 - FONT_SIZE / 2
    
          return (
            <text
              key={index}
              x={x}
              y={y - 20}
              dominantBaseline='central'
              textAnchor='start'
              transform={`rotate(45, ${x}, ${y})`}
              style={{
                fill: '#a0a0a0',
                fontSize: FONT_SIZE,
                fontWeight: 'bold',
                fontFamily: 'Nunito'
              }}
            >
              {element[1]}
            </text>
          )
          })
    }

    return data[0].map((element, index) => {
      const x =
        ((element.x - minX) / (maxX - minX)) * width + 10 - FONT_SIZE / 2

      return (
        <text
          key={index}
          x={x}
          y={y - 20}
          dominantBaseline='central'
          textAnchor='start'
          transform={`rotate(45, ${x}, ${y})`}
          style={{
            fill: '#a0a0a0',
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


  const Mark = ({coord, idx, onMouseOver, onMouseLeave, color="red"}) => {

    return (
     <g key={`dot-${idx}`} pointerEvents='all' onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        <circle cx={coord[0]} cy={coord[1]} r='3' fill={color}/>
      </g>
      )
  }


  const Tooltips = ({x=500,y=70, label="545.245 MW", sublabel="3:24:02"}) => {

    const rectPos = [x-35, y - 40]

    const height = 25
    const width = 50

    return (<>
      <rect x={rectPos[0]} y={rectPos[1]} width={width + label.length*4} height={height} rx="15" fill="#c0c0c0">
      </rect>
      <text
        x={rectPos[0] + (width - label.length)/3}
        y={rectPos[1] + height/2}
        style={{
          fill: 'white',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }}>
          {label}
      </text>
      <text
        x={rectPos[0] + (width - label.length)/3}
        y={rectPos[1] + height/2 + 10}
        style={{
          fill: 'white',
          fontSize: '0.6rem',
          fontWeight: 'bold',
          fontFamily: 'Nunito'
        }}>
          {sublabel}
      </text>

      </>
    )
  }

  

  return (
    <>
      <div className='phase' style={{ float: 'right', marginBottom: '15px'}}>
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
        <style>{`.small {color: 'red'} .linear {backgroundColor:'blue'}`}</style>
        <defs>
          <linearGradient  id="three_opacity_0" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorsFill[0]} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colorsFill[0]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorsFill[0]} stopOpacity="0.0" />
          </linearGradient>
          <linearGradient  id="three_opacity_1" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorsFill[1]} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colorsFill[1]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorsFill[1]} stopOpacity="0.0" />
          </linearGradient>
          <linearGradient  id="three_opacity_2" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorsFill[2]} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colorsFill[2]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorsFill[2]} stopOpacity="0.0" />
          </linearGradient>
          <linearGradient  id="three_opacity_3" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorsFill[0]} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colorsFill[0]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorsFill[0]} stopOpacity="0.0" />
          </linearGradient>
          <linearGradient  id="three_opacity_4" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={colorsFill[1]} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colorsFill[1]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colorsFill[1]} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <XAxis />
        <LabelsXAxis />
        
        {/* <YAxis /> */}
        <HorizontalGuides />
        {polygonPoints.map((points, idx) => {
          if (visible[idx]) {
            return (<>
               <polygon points={points} fill={`url('#three_opacity_${idx}')`}/>
              </>
            )
          }
        })}
        {points.map((points, idx) => {
          if (visible[idx]) {
            return (<>
              <polyline
                key={idx}
                fill='none'
                stroke={colors[idx]}
                strokeWidth='3px'
                strokeLinecap='round'
                strokeDasharray='1'
                points={points}
              />
              </>
            )
          }
        })}


        {pointsCoords.map((coords, idxParent) => {
          if (visible[idxParent]) {
            return coords.map((coord, idx)=> {

              return <>
                <Mark 
                  key={idx}
                  coord={coord} 
                  idx={idx} 
                  color={colors[idxParent]}
                  onMouseOver={()=> setTooltipVisible(`${coord[0]}-${coord[3]}`)}
                  onMouseLeave={()=>{
                    setTooltipVisible(null)}}
                ></Mark>
              </>
            }
            )
          }

        })}     
        {pointsCoords.map((coords, idx) => {
            if (visible[idx]) {
              return coords.map((coord, idx)=> {
                const quantity = coord[2].toFixed(2)
                return <>
                  { tooltipVisible == `${coord[0]}-${coord[3]}` &&  
                  <Tooltips key={idx} x={coord[0]} y={coord[1]} label={`${quantity} kW`} sublabel={coord[4]}>
                  </Tooltips>}
                </>
              }
              )
            }
          })}   
      </svg>

      
    </>
  )
}
