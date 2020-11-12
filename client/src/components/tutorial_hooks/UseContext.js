import React , {useState} from 'react'
import Alert from '../alert./Alert'
import { AlertProvider } from '../alert./AlertContext'
import Main from '../Main'

 export  const AlertContext = React.createContext()

export  default function UseContext() {


    return (


        <AlertProvider >
        <div className="container">
            <Main toggle={()=>{}}/>
            <Alert/>
        </div>
        </AlertProvider>
    )
}

