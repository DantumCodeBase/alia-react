import React from 'react'
import styles from './styles.module.css'
// import Input from './Input'

// Components
export { Input } from './Input'
export { Button } from './Button'
export { LineChart } from './LineChart'
export { BarChart } from './Barchart'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

// export const Input = () => <div>Hola</div>
