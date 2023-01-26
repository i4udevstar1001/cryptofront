import { useState } from 'react'
import styles from './styles.module.sass'
import smile from '../../Assets/smile.svg'
import arrowRightCircle from '../../Assets/arrow-right-circle.svg'
import { useDispatch, useSelector } from "react-redux"
import {addMessage} from "../../../Redux/State/Chat"
// import { X } from 'react-feather'
const Message = (props) => {

    const classNames =
        `${styles.message} ${props.type === 'SEND' ? styles.send : styles.receive}`

    return (
        <div style={{
            display: 'flex', 
            justifyContent: props.type === 'SEND' ? 'flex-end' : 'flex-start'
        }}>
            <div className={classNames}>
                <span>{props.from}</span>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

const MessageForm = () => {
    const [state, setState] = useState(null)
    const dispatch = useDispatch()
    const handleClick = () => {
        if(state){
            const payload = {
                from: 'John',
                type: 'SEND',
                message: state 
            }
            dispatch(addMessage(payload))
            setState('')
        }         
    }
    const handleKeyDown = event => {
        if(event.key === 'Enter')
            handleClick()
    }
    return (
        <>
        <div className={styles.messageForm}>
            <input 
                value={state} 
                onChange={e => setState(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder={'Enter you message'}
            />
            <img src={smile} className={styles.smile} alt=""/>
        </div>
        <img src={arrowRightCircle}  onClick={handleClick} alt=""/>
        </>
)
    
}

const Chat = (props) => {    
    const state = useSelector(state => state.chat)
    
    return (
        <div className={`${styles.container} ${props.desktop ? {} : styles.absolute}`}>
             <div className={styles.chatBox}>
                <div className={styles.header}>
                    <span>Message</span>
                </div>
                <div className={styles.content}>
                    <p>This is the beginning of
                        your conversation in this group</p>
                    {state.map((item, key) => (
                        <Message from={item.from} key={key} type={item.type} message={item.message}/>
                    ))}
                </div>
                <div className={styles.footer}>
                    <MessageForm/>
                </div>
            </div>
        </div>
    )
}

export default Chat;