import React , {useState, useRef, useEffect} from 'react'
import Component from '../Component/Component'
import styles from './timer.module.sass'
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard'
import Bar from './bar'

const Timer =(props)=>{
     

    const [timerDays, setTimerDays] = useState('00')
    const [timerHours, setTimerHours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00')
    const [isOver, setTimerOver] = useState(false)

    const deleteHandler = ()=>{
        return deleteTimer(props.key)
    }
  

    let interval = useRef();

    const {dataDate, title, deleteTimer} = props;

    const startsTimer = () =>{
    
        const countDownDate = new Date(dataDate).getTime();

        

        interval= setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = countDownDate - now;
            

            const days = Math.floor(timeLeft / (1000*60*60*24));
            const hours = Math.floor((timeLeft % (1000*60*60*24) / (1000*60*60)));
            const minutes = Math.floor((timeLeft % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((timeLeft % (1000*60)) / 1000);
            
            
            if(timeLeft < 0){
                //stop
                clearInterval(interval.current)
                setTimerOver(true)
                
                
            }else{
                //update
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds); 
                // setProgress(oldValue => {
                //     let  newValue = oldValue +1
                //     if(newValue == timeLeft){
                //         newValue = oldValue 
                //     }
                    
                    
                //      return newValue
                     
                // })
            }
        }, 1000)
    }

    

    useEffect(() => { 
        startsTimer();
        return ()=>{
            clearInterval(interval.current)
        }
    })

    return (
        <div className={styles.parentCont}>
            <h1 onClick={deleteHandler}> x</h1>
            <div className={styles.displayNone}> </div>
            
            <div className={styles.timerContainer}>
                {/* <Bar value={progress} max={bone }/> */}
                <div className={styles.title}>
                    <h2> {title} </h2>
                    {/* <h1>{progress}</h1> */}
                </div>
                <div className={styles.timer}>
                    <div className={styles.timeSection}>
                        <p>
                            D
                        </p>
                        <p> {timerDays} </p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>
                            H
                        </p>
                        <p> {timerHours} </p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>
                            Min
                        </p>
                        <p> {timerMinutes} </p>
                    </div>
                    
                    <div className={styles.timeSection}>
                        <p>Sec</p> <p> {timerSeconds} </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Timer
