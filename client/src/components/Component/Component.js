import React,{ useState, useEffect} from 'react'

import styles from './Component.module.sass'

export default function Component(props) {

    const {display, callback} = props
    
    

    return (
        <div className={display ? styles.true : styles.false}>
            o
        </div>
    )
}
