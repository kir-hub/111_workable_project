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
        <>
        <h2>Do you want a matching domain (.com URL) with your name? </h2>
        <h6>If you want a matching domain, our platform will only accept those name
         suggestions where the domain is available. (Recommended)</h6>

        <div className={styles.buttonGroupDiv}>

              
            <div onClick={toggleOne} className={activeOne ? styles.activeCont : styles.mainCont}>
            <h1> Yes </h1>
            <SingleButton innerText='The Domain should exactly match the name'/>
            </div>
            <div onClick={toggleTwo} className={activeTwo ? styles.activeCont : styles.mainCont}> 
            <h1> Yes </h1>   
            <SingleButton innerText='But minor variations are allowed' recommended={true}/>
            </div>
              
            <div onClick={toggleThree} className={activeThree ? styles.activeCont : styles.mainCont}>
            <h1> No </h1>
            <SingleButton innerText='I am only looking for a name, not a Domain'/>
            </div>
        </div>
        </>
    )
}
