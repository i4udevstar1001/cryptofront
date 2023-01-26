import { useState } from 'react'
import {ChevronDown, ChevronUp } from "react-feather"
import './ShowMoreText.sass'
export default ({children}) => {
    const [className, setClassName] = useState('')
    const toggle = () => {
        if(className === '')
            setClassName('open')
        else setClassName('')
    }
    return (
        <div className={` showMoreText ${className}`} onClick={toggle}>
            <p>{children}</p>
            <div style={{alignItems: 'start'}}>
                {className ? <ChevronUp size={40} color={'white'}/> : <ChevronDown size={40} color={'white'}/> }
            </div>
        </div>
    )

}
