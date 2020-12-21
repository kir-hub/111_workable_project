import { months } from 'moment'
import React, { useState, useContext, createContext } from 'react'
import { useEffect } from 'react'
import Timer from '../../components/TimerComponents/TimerHooks'
import styles from './EventPage.module.sass'
import useLocalStorage from './localStorageFunction/useLocalStorage'



export default function Events() {


    const [timers, setTimers] = useState([])
    const [date, setDate] = useState('')
    const [sec, setSec] = useState('00')
    const [minute, setMin] = useState('00')
    const [hour, setHour] = useState('00')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const fullDate =  month+ ' '+ day + ' ' + year + ' ' + sec +':'+ minute +':'+ hour//sec +':'+ min +':'+ hour +' '+ day +' '+ month +' '+ year
    
    const timerHook = <Timer dataDate={fullDate} title={title} description={description}/>

    
    
    const dateHandler = ()=>{
        setDate(fullDate)
        const newTimersArr = [...timers, timerHook]
        newTimersArr.sort(compareTimers);             
        //console.log(newTimersArr);
        setTimers(newTimersArr )   
        // console.log(timerHook.props.dataDate);
        //localStorage.setItem('arr', )
        
    }
    
    const mapedArray = timers.map((item, index) =><li key={index}>{item}</li>)

    

    const compareTimers = (a,b)=>{
        if (a.props.dataDate > b.props.dataDate) return 1;
        if (a.props.dataDate < b.props.dataDate) return -1;
    }
    
    return (
        <div className={styles.mainContainer}>
            
            <h1>Create new reminder for your event</h1>          
            <input onChange={e => setDay(e.target.value)} value={day} placeholder='day' className={styles.day}/>
            <input onChange={e => setMonth(e.target.value)} value={month} placeholder='month' className={styles.month}/>
            <input onChange={e => setYear(e.target.value)} value={year} placeholder='year'/>
            <h2> Exact time</h2>
            <input onChange={e => setSec(e.target.value)} value={sec} placeholder='hour'/>
            <input onChange={e => setMin(e.target.value)} value={minute} placeholder='minutes'/>
            <input onChange={e => setHour(e.target.value)} value={hour} placeholder='sec'/>
            <input onChange={e => setTitle(e.target.value)} value={title} placeholder='title'/>
            <input onChange={e => setDescription(e.target.value)} value={description} placeholder='description'/>           
            <button onClick={dateHandler}> Add event</button>
            
            <hr/>
                <ul className={styles.timersList}>

                 { mapedArray }         {  /*айтемс это типа остальные таймеры по идее */}
                 
                </ul>


            
        </div>
    )
}
