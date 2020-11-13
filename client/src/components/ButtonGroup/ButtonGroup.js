import React from 'react'
import SingleButton from './SingleButton' 
import styles from './SingleButton.module.sass'

export default function ButtonGroup() {



    return (
        <div className={styles.buttonGroupDiv}>
            <SingleButton innerText='The Domain should exactly match the name'/>
            <SingleButton innerText='But minor variations are allowed' recommended={true}/>
            <SingleButton innerText='I am only looking for a name, not a Domain'/>
        </div>
    )
}
