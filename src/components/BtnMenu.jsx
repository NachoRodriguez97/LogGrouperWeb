import React from 'react'
import { Link } from 'react-router-dom'

export const BtnMenu = ({ name, redirect, color }) => {
    const btnStyle = {
        borderColor: color,
        background: color
    }
    return (
        <>
            <Link style={btnStyle} to={redirect} className='m-4 btn btn-danger p-3'>
                {name}
            </Link>
        </>
    )
}
