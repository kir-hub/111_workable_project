import React, { useState } from 'react'

export default function Bar(props) {

    const {value, max} = props
    return (
        
        <div>
            <progress value={value} max={max}/>        
        </div>
    )
}
