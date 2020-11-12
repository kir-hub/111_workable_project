import React , {useState, useEffect} from 'react'



function useOwnHook(value){
    useEffect(() => {
        console.log('value changed', value)
        
    }, [value])
}

function useInput(initialValue){
    const [value, setValue] = useState(initialValue)


    const onChange = event =>{
        setValue(event.target.value)
    }

    const clear = () => setValue('')
    return{
        bind: {value, onChange},
        value,
        clear
    }
}



export default function OwnHook() {
    //const [name, setName] = useState('')
    // const [lastName, setLastName] = useState('')


    // const changeHandler =(e)=>{
    //     setName(e.target.value)
    // }

    // const lastNameHandler =(e)=>{
    //     setLastName(e.target.value)
    // }

    const input = useInput('')
    const lastName = useInput('')

    useOwnHook(input.value)

    return (
        <div>
            <h1>{input.value}</h1>
            <h2> {lastName.value}</h2>
            {/* <h2>{lastName}</h2> */}
            {/* <input type='text' value={input.value} onChange={input.onChange}/> */}
            <input type='text' {...input.bind}/>
            <button onClick={()=> input.clear() } >clear</button>
            <input type='text' {...lastName.bind}/> 

            {/* <input type='text' value={lastName} onChange={lastNameHandler}/> */}

            
        </div>
    )
}
