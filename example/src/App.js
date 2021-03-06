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
    { label: '12:20:01', x: 0, y: 48 },
    { label: '12:56:59', x: 1, y: 48 },
    { label: '1:00:03', x: 2, y: 48 },
    { label: '1:40:04', x: 3, y: 48},
    { label: '1:50:05', x: 4, y: 48 },
    { label: '1:60:06', x: 5, y: 48 },
    { label: '2:15:07', x: 6, y: 48 },
    { label: '2:24:01', x: 7, y: 48 },
    { label: '2:45:02', x: 8, y: 148.4564 },
    { label: '3:00:03', x: 9, y: 48},
    { label: '3:24:04', x: 10, y: 48},
    { label: '3:24:05', x: 11, y: 48 },
    { label: '4:24:06', x: 12, y: 48 },
    { label: '4:24:07', x: 13, y: 48 }
  ],

]


// const multidata = [
//   [
//     { label: '12:20:01', x: 0, y: 48 },
//     { label: '12:56:59', x: 1, y: 200.37 },
//     { label: '1:00:03', x: 2, y: 200.37 },
//     { label: '1:40:04', x: 3, y: 200.37},
//     { label: '1:50:05', x: 4, y: 20.37 },
//     { label: '1:60:06', x: 5, y: 200.37 },
//     { label: '2:15:07', x: 6, y: 20.37 },
//     { label: '2:24:01', x: 7, y: 200.37 },
//     { label: '2:45:02', x: 8, y: 200.37 },
//     { label: '3:00:03', x: 9, y:  120.37},
//     { label: '3:24:04', x: 10, y: 20.37},
//     { label: '3:24:05', x: 11, y: 20.37 },
//     { label: '4:24:06', x: 12, y: 20.37 },
//     { label: '4:24:07', x: 13, y: 20.37 }
//   ],
//   [
//     { label: '3:24:01', x: 0, y: 6.84 },
//     { label: '3:24:02', x: 1, y: 6.84 },
//     { label: '3:24:03', x: 2, y: 600.84 },
//     { label: '3:24:04', x: 3, y: 6.84},
//     { label: '3:24:05', x: 4, y: 6.84 },
//     { label: '3:24:06', x: 5, y: 6.84 },
//     { label: '3:24:07', x: 6, y: 6.84 },
//     { label: '3:24:01', x: 7, y: 6.84 },
//     { label: '3:24:02', x: 8, y: 6.84 },
//     { label: '3:24:03', x: 9, y:  6.84},
//     { label: '3:24:04', x: 10, y: 6.84},
//     { label: '3:24:05', x: 11, y: 6.84 },
//     { label: '3:24:06', x: 12, y: 6.84 },
//     { label: '3:24:07', x: 13, y: 6.84 }
//   ],
//   [
//     { label: '3:24:01', x: 0, y: 6.84 },
//     { label: '3:24:02', x: 1, y: 6.84 },
//     { label: '3:24:03', x: 2, y: 6.84 },
//     { label: '3:24:04', x: 3, y: 6.84},
//     { label: '3:24:05', x: 4, y: 6.84 },
//     { label: '3:24:06', x: 5, y: 6.84 },
//     { label: '3:24:07', x: 6, y: 600.84 },
//     { label: '3:24:01', x: 7, y: 6.84 },
//     { label: '3:24:02', x: 8, y: 6.84 },
//     { label: '3:24:03', x: 9, y:  6.84},
//     { label: '3:24:04', x: 10, y: 6.84},
//     { label: '3:24:05', x: 11, y: 6.84 },
//     { label: '3:24:06', x: 12, y: 6.84 },
//     { label: '3:24:07', x: 13, y: 6.84 }
//   ],
//   [
//     { label: '3:24:01', x: 0, y: 60.84 },
//     { label: '3:24:02', x: 1, y: 60.84 },
//     { label: '3:24:03', x: 2, y: 60.84 },
//     { label: '3:24:04', x: 3, y: 60.84},
//     { label: '3:24:05', x: 4, y: 60.84 },
//     { label: '3:24:06', x: 5, y: 60.84 },
//     { label: '3:24:07', x: 6, y: 60.84 },
//     { label: '3:24:01', x: 7, y: 6.84 },
//     { label: '3:24:02', x: 8, y: 60.84 },
//     { label: '3:24:03', x: 9, y:  60.84},
//     { label: '3:24:04', x: 10, y: 60.84},
//     { label: '3:24:05', x: 11, y: 6.84 },
//     { label: '3:24:06', x: 12, y: 6.84 },
//     { label: '3:24:07', x: 13, y: 6.84 }
//   ]
// ]


// const multidata = [
//   [
//     { label: '3:24:01', x: 0, y: 100 },
//     { label: '3:24:02', x: 1, y: 100 },
//     { label: '3:24:03', x: 2, y: 100 },
//     { label: '3:24:04', x: 3, y: 100}, 
//     { label: '3:24:05', x: 4, y: 100 },
//     { label: '3:24:06', x: 5, y: 100 },
//     { label: '3:24:07', x: 6, y: 100 },
//     { label: '3:24:01', x: 7, y: 100 },
//     { label: '3:24:02', x: 8, y: 100 },
//     { label: '3:24:03', x: 9, y:  100},
//     { label: '3:24:04', x: 10, y: 100},
//     { label: '3:24:05', x: 11, y: 100 },
//     { label: '3:24:06', x: 12, y: 100 },
//     { label: '3:24:07', x: 13, y: 100 }
//   ],
//   [
//     { label: '3:24:01', x: 0, y: -200 },
//     { label: '3:24:02', x: 1, y: -200 },
//     { label: '3:24:03', x: 2, y: -200 },
//     { label: '3:24:04', x: 3, y: -200},
//     { label: '3:24:05', x: 4, y: -200 },
//     { label: '3:24:06', x: 5, y: -200 },
//     { label: '3:24:07', x: 6, y: -200 },
//     { label: '3:24:01', x: 7, y: -200 },
//     { label: '3:24:02', x: 8, y: -200 },
//     { label: '3:24:03', x: 9, y:  -200},
//     { label: '3:24:04', x: 10, y: -200},
//     { label: '3:24:05', x: 11, y: -200 },
//     { label: '3:24:06', x: 12, y: -200 },
//     { label: '3:24:07', x: 13, y: -200 }
//   ],
//   [
//     { label: '3:24:01', x: 0, y: -200 },
//     { label: '3:24:02', x: 1, y: -200 },
//     { label: '3:24:03', x: 2, y: -200 },
//     { label: '3:24:04', x: 3, y: -200},
//     { label: '3:24:05', x: 4, y: -200 },
//     { label: '3:24:06', x: 5, y: -200 },
//     { label: '3:24:07', x: 6, y: -200 },
//     { label: '3:24:01', x: 7, y: -200 },
//     { label: '3:24:02', x: 8, y: -200 },
//     { label: '3:24:03', x: 9, y:  -200},
//     { label: '3:24:04', x: 10, y: -200},
//     { label: '3:24:05', x: 11, y: -200 },
//     { label: '3:24:06', x: 12, y: -200 },
//     { label: '3:24:07', x: 13, y: -200 }
//   ]
// ]


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
  data: {
    '2019': [0, 100, 400, 700, 1000, 1300, 1600, 1900, 45, 63, 32, 21],
    '2020': [4, 200, 500, 800, 1100, 1400, 1700, 2000, 90, 50, 80, 42],
    Predicted: [56, 300, 600, 900, 1200, 1500, 1800, 800, 0, 60, 56, 84],
  }
  , labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

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
      <Button>Login</Button>
      <div style={{ padding: 100, maxWidth: 700 }}>
        <LineChart
          key="uno"
          data={chartData}
          labels={labels}
          height={200}
          width={800}
          padding={0}
        />
          <LineChart
          key="dos"
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
