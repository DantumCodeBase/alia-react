import React, { useState, useEffect } from 'react'

import {
  ExampleComponent,
  Input,
  Button,
  LineChart,
  BarChart
} from 'alia-react'
import 'alia-react/dist/index.css'

const multidata = [
  [
    { label: '3:24:01', x: 0, y: 0 },
    { label: '3:24:02', x: 1, y: 0 },
    { label: '3:24:03', x: 2, y: 0 },
    { label: '3:24:04', x: 3, y: 0 },
    { label: '3:24:05', x: 4, y: 0 },
    { label: '3:24:06', x: 5, y: 0 },
    { label: '3:24:07', x: 6, y: 0 }
  ],
  [
    { label: 'S', x: 0, y: 0 },
    { label: 'M', x: 1, y: 0 },
    { label: 'T', x: 2, y: 0 },
    { label: 'W', x: 3, y: 0 },
    { label: 'TH', x: 4, y: 0 },
    { label: 'F', x: 5, y: 0 },
    { label: 'S', x: 6, y: 0 }
  ],
  [
    { label: 'S', x: 0, y: 0 },
    { label: 'M', x: 1, y: 0 },
    { label: 'T', x: 2, y: 0 },
    { label: 'W', x: 3, y: 0 },
    { label: 'TH', x: 4, y: 0 },
    { label: 'F', x: 5, y: 0 },
    { label: 'S', x: 6, y: 0 }
  ]
]

const timeseriesData = [
  [
    { label: 'test', x: 7, y: 3 },
    { label: 'test', x: 7, y: 9 },
    { label: 'test', x: 7, y: 100 }
  ],
  [
    { label: 'test', x: 8, y: 3 },
    { label: 'test', x: 8, y: 3 },
    { label: 'test', x: 8, y: 3 }
  ],
  [
    { label: 'test', x: 9, y: 3 },
    { label: 'test', x: 9, y: 2 },
    { label: 'test', x: 9, y: 1 }
  ],
  [
    { label: 'test', x: 10, y: 5 },
    { label: 'test', x: 10, y: 3 },
    { label: 'test', x: 10, y: 1 }
  ],
  [
    { label: 'test', x: 11, y: 4 },
    { label: 'test', x: 11, y: 1 },
    { label: 'test', x: 11, y: 7 }
  ],
  [
    { label: 'test', x: 12, y: 3 },
    { label: 'test', x: 12, y: 8 },
    { label: 'test', x: 12, y: 5 }
  ],
  [
    { label: 'test', x: 13, y: 6 },
    { label: 'test', x: 13, y: 2 },
    { label: 'test', x: 13, y: 1 }
  ],
  [
    { label: 'test', x: 14, y: 4 },
    { label: 'test', x: 14, y: 8 },
    { label: 'test', x: 14, y: 2 }
  ]
]

const barChartData = {
  '2019': [0, 0, 21, 45, 63, 30, 90, 21, 45, 63, 32, 21],
  '2020': [4, 36, 13, 21, 50, 80, 42, 13, 21, 50, 80, 42],
  Predicted: [56, 72, 24, 31, 60, 56, 84, 24, 31, 60, 56, 84]
}

const App = () => {
  const [chartData, setChartData] = useState(multidata)

  useEffect(() => {
    const updateData = () => {
      setTimeout(() => {
        let newdata = [...multidata]
        setChartData(newdata)
        // console.log(newdata)
        updateData()
      }, 3000)
    }
  }, [])

  const labels = ['Phase 1', 'Phase 2', 'Phase 3']

  // console.log('REcalc')

  return (
    <div>
      <ExampleComponent text='Create React Library Example' />
      <Input></Input>
      <Button></Button>
      <div style={{ padding: 25, maxWidth: 700 }}>
        <LineChart
          data={chartData}
          labels={labels}
          height={200}
          width={800}
          padding={0}
        />
      </div>
      <div style={{ padding: 25, maxWidth: 700 }}>
        <BarChart
          data={barChartData}
          height={200}
          width={800}
          padding={0}
        ></BarChart>
      </div>
    </div>
  )
}

export default App
