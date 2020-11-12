import React, {useState} from 'react'


function computeInitialCounter(){
  console.log('some calc...')
  return Math.trunc(Math.random()*20)
}

function UseState() {


  const [counter, setCounter] = useState(() => {
    return computeInitialCounter()
  })

  const [state, setState] = useState( {
    title: 'counter',
    date: Date.now()
  })

  function increment(){
    // setCounter(counter + 1)
    // setCounter(counter + 1)
    setCounter((previousCounter)=> {
      return previousCounter + 1
    })
    setCounter(prev => prev + 1)
  }

  function decrement(){
    setCounter(counter - 1)
  }



  function updateTitle(){
    setState(prev => {
      return {
       ...prev,
        title: Math.random()
      }
    })
  }


  // const [value, setValue] = useState(1)
  // let x = 2
  return (
    <div>
      <h1> counter: {counter}</h1>
      <button onClick={increment} className='btn btn-success'>add</button>
      <button onClick={decrement} className='btn btn-danger'>del</button>
      <button onClick={updateTitle} className='btn btn-default'>change name</button>
      {/* <button onClick={ e => setValue(x)} className='btn btn-success'>add</button> */}

      

      <pre>{JSON.stringify(state, null , 2)}</pre>
        


    </div>
  );
}

export default UseState;
