import React, {useState} from 'react'
import styles from './SingleButton.module.sass'

export default function SingleButton(props) {

    const {innerText, recommended} = props

    const Recommended = recommended ? '(Recommended)' : ''

    const [toggle, setToggle] = useState(false)
    

    const yesOrNo = toggle ? 'Yes' : 'No'

 
    return (
        <div >
            <h2  onClick={() => setToggle(!toggle)}> {yesOrNo} </h2>
            <p>{innerText} </p>
            <p> {Recommended}</p>
        </div>
    )
}
