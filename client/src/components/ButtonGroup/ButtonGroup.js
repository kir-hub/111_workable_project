import React, {useState} from 'react'
import SingleButton from './SingleButton' 
import styles from './SingleButton.module.sass'

export default function ButtonGroup() {

const [activeOne, setActiveOne] = useState(false)
const [activeTwo, setActiveTwo] = useState(false)
const [activeThree, setActiveThree] = useState(false)

const toggleOne = ()=>{
    setActiveOne(true)
    
        setActiveTwo(false)
        setActiveThree(false)
    
}

const toggleTwo = ()=>{
    setActiveTwo(true)
    
        setActiveOne(false)
        setActiveThree(false)
    
}

const toggleThree = ()=>{
    setActiveThree(true)
    
        setActiveOne(false)
        setActiveTwo(false)
    
}







    return (
        <div className={styles.buttonGroupDiv}>
            <div onClick={toggleOne} className={activeOne ? styles.activeCont : styles.mainCont}>
            <SingleButton innerText='The Domain should exactly match the name'/>
            </div>
            <div onClick={toggleTwo} className={activeTwo ? styles.activeCont : styles.mainCont}>    
            <SingleButton innerText='But minor variations are allowed' recommended={true}/>
            </div>
            <div onClick={toggleThree} className={activeThree ? styles.activeCont : styles.mainCont}>
            <SingleButton innerText='I am only looking for a name, not a Domain'/>
            </div>
        </div>
    )
}
