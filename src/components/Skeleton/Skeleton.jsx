import React from 'react'
import './skeleton.css'

const Skeleton = ({type}) => {

    const classes = `skeleton ${type}`

  return (
    <div className={classes}>
         
    </div>
  )
}

export default Skeleton