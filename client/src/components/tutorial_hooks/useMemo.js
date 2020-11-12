import React, {useState, useMemo, useEffect} from 'react'


function complexCompute(num){
    //console.log(complexCompute);
    let  i = 0
    while (i< 1000000000) i++
    return num*2
}

export default function UseMemo() {

    const [number, setNumber] = useState(42)

    const [colored, setColored]= useState(true)

    const styles = useMemo(()=> ({
        color:  colored ? 'darkred' : 'black'
    }), [colored])



    const computed = useMemo(() => { // юзМемо запоминает значение параметра функции в ретурне и не вычисляет его и не происходит повторный рендер, после надо указать зависимость после изменениря которой должен случится новый рендер
        return complexCompute(number)
    }, [number])

    useEffect(()=>{
        console.log('styles changed')
    }, [styles])




    return (
        <div>
            <h1 style={styles}> counted value: {computed}</h1>
            <button onClick={()=>setNumber(prev => prev+1)}>add</button> {/*  prev это параметр который задан изначально, функция принимае прев и возвращает его */}
            <button onClick={()=> setNumber(prev=> prev -1)}>destroy</button>
            <button onClick={()=> setColored(prev=> !prev )}>change</button>

        </div>
    )
}
