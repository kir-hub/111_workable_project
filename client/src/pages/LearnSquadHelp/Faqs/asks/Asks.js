import React from 'react'
import faq from '../../Articles/Asks.json';
import {Link} from 'react-router-dom'
import styles from './Asks.module.sass'

export default function Asks(props) {
    const {header, body} = props
    const AsksElements = faq.map((paragraph, index) => {
        if( (index + 1) % 2 == 0){
            return <div key={index} className={styles.even}>
            <div className={styles.header}>{paragraph.header}</div>
            <div  className={styles.body}>{paragraph.body}</div>

            <div>
            <span  className={styles.header}>{paragraph.title}</span> 
            <span className={styles.body}>{paragraph.text}</span>
            </div>
            <div>
            <span  className={styles.header}>{paragraph.title1} </span>
            <span  className={styles.body}>{paragraph.text1}</span>
            </div>
            <div>
            <span  className={styles.header}>{paragraph.title2}</span>
            <span  className={styles.body}>{paragraph.text2}</span>
            </div>


            

        </div>
        }else{
            return (<>
            
            <div key={index} className={styles.odd}>
                    <div className={styles.header}>{paragraph.header}</div>
                    <div className={styles.body}>{paragraph.body}</div>

                <div>
                <Link className={styles.body} to='google.com'><p>{paragraph.link1}</p></Link>
                </div>
                <div>
                <Link className={styles.body}><p>{paragraph.link2}</p></Link>
                </div>
                <div>
                <Link className={styles.body}><p>{paragraph.link3}</p></Link>
                </div>
                </div>

                
                </>)
        
    }});

    

    
    return (
        <>
        <div className={styles.returnDiv}>
            <div><div className={styles.askDiv}><h1>?</h1></div> </div>  <h1>Frequently Asked Questions</h1>
            
            </div>
            <hr/>
            
            {AsksElements}
        
        </>
    )

    }

