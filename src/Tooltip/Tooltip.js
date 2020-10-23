import React from 'react'

import './Tooltip.scss'


export default function Tooltip({value=0.0, units='Na', x=0, y=0}) {
  return (
    <div style={{...styles.container, ...{left:`${x}px`, top:`${y}px`}}}>
      <p style={styles.text}>{`${value} ${units}`}</p>
    </div>
  )
}


const styles = {
  container: {
    backgroundColor: '#b0b0b0',
    color: 'white',
    fontSize: '0.5rem',
    lineHeight: 0,
    padding: 5,
    position: 'absolute',
    borderRadius: 5,
    display: 'inline-block',
    textAlign: 'center'
  },

}