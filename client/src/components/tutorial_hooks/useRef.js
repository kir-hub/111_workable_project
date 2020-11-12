import React, {useRef, useState, useEffect} from 'react'




export default function UseRef() {
    //const [renderCount, setRenderCount] = useState(1);
    const [value, setValue] =  useState('initial')
    
    const renderCount = useRef(1)

    const inputRef = useRef(null)

    const prevValue = useRef('')

    useEffect(()=>{
        prevValue.current = value
    }, [value])





    useEffect(()=>{
        renderCount.current++
        console.log(inputRef.current.value);
    } )

    const focus = () => inputRef.current.focus()



    return (
        <div>
            <h1> render count : {renderCount.current}</h1>
            <h2> prev value {prevValue.current}</h2>
            <input ref={inputRef} type ="text" onChange={ e => setValue(e.target.value)} value={value}/>
            <button onClick={focus}/>
        </div>
    )
}
