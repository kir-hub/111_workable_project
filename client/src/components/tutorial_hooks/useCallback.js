import React, {useState, useMemo, useEffect, useCallback} from 'react'
import ItemsList from '../ItemsList'



export default function UseCallback() {

    const [colored, setColored]= useState(true)
    const[count, setCount] = useState(1)

    const styles = {
        color: colored ? 'darkred': "black"
    }

    const generateItemsFromAPI = useCallback((indexNumber) =>{
        return new Array(count).fill('').map( (_, i) => `element ${i +indexNumber}`)
    },[count])



    return (
        <div>
            <h1 style={styles}> elements: {count}</h1>
            <button onClick={()=>setCount(prev => prev+1)}>add</button> {/*  prev это параметр который задан изначально, функция принимае прев и возвращает его */}
            <button onClick={()=> setColored(prev=> !prev )}>change</button>

            <ItemsList getItems={generateItemsFromAPI}/>
        </div>
    )
}
