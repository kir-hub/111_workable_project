import React, {useEffect, useState, useRef} from 'react'

export default function Hooks() {
    

    
    
    
    
    return (
        <div>
            <h1>resource: {type}</h1>
            <button onClick={()=> setType('users')}> users</button>
            <button onClick={()=> setType('todos')}> todos</button>
            <button onClick={()=> setType('posts')}> posts</button>

        </div>
    )
}



    // const [type, setType] = useState('users')

    // const [data, setData] = useState([])

    


    // useEffect(()=>{

    // }, [type])

    // useEffect(()=>{
    //     console.log('component didi mount');
    // }, [])
    
    