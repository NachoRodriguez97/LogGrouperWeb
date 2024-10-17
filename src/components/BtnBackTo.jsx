import React from 'react'
import { Link } from 'react-router-dom'

export const BtnBackTo = ({redirect}) => {

  const btnStyle = {
    color: 'white',
    fontWeight: '500',
    width:'75%',
    padding: '10px',
  }

  return (
    <>
      <Link to={redirect} className='btn btn-primary m-4' style={btnStyle}>
        Volver
      </Link>
    </>
  )
}
