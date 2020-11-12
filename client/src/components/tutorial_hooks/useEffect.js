import React, {useEffect , useState} from 'react'
import UseState from './useState'

export default function UseEffect() {
    
    const [type, setType]=useState('users')

    const [data, setData] =useState([])
    
    const [pos, setPos] = useState({x: 0, y : 0})
    // useEffect( ()=> {
    //     console.log("render");
    // })
    
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(response => response.json())
        .then(json => setData(json))

        return() =>{
            console.log('clean type')
        }
    }, [type])
    
    const mouseMoveHandler = event => {
            setPos({
                x: event.clientX,
                y: event.clientY
            })
        }

    useEffect(()=>{

        console.log('componentDidMount');
        window.addEventListener('mousemove', mouseMoveHandler)

        return() =>{
        window.removeEventListener('mousemove', mouseMoveHandler)
        }

    },[])
    
    
    
    return (
        <div>
            <h1>resource: {type}</h1>
            <button onClick={ () => setType('users') }> users </button>
            <button  onClick={() => setType('todos')}> todos </button>
            <button onClick={() => setType('posts')}> post </button>

            {/* <pre>{JSON.stringify(data ,null,2)}</pre> */}
            <pre>{JSON.stringify(pos ,null,2)}</pre>


        </div>
    )
}
