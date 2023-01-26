import React, {useState} from "react";
import styles from './styles.module.sass'
import {Layout, Button} from 'antd'
import {Codesandbox, MessageSquare} from 'react-feather'
import Countdown from '../Countdown'
import HandsHistory from '../HandsHistory'
import Chat from '.././Chat'
import variables from '../../../variables'
const Sider = Layout

const SiderComponent = (props) => {
    const [state, setState] = useState(null)

    const components = (
        <>
            {state === 1 &&  <HandsHistory desktop={props.desktop}/>}
            {state === 2 && <Chat desktop={props.desktop}/>}
        </>
    )
    
    if(props.desktop){
        return (
            <Sider className={styles.container}>
                <div className={styles.header}>
                    <Button size={'large'}>Other games</Button>
                </div>
                <div className={styles.body}>
                    {state === null && (
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Countdown label={'Player later'} roomName={'ACE #2'}/>
                            <div  style={{color: variables.colors.secondary, padding: '64px', textAlign: 'center'}}>
                                <p>You don’t have any Pending Game</p>
                            </div>
                        </div>
                            
                    )}
                    {components}
                </div>
                <div className={styles.footer}>
                    <Button
                        style={{backgroundColor: state !== 1 ? variables.colors.secondary : null}}
                        onClick={() => {setState(1)}}
                    >
                        <Codesandbox/>
                    </Button>
                    <Button
                        style={{backgroundColor: state !== 2 ? variables.colors.secondary : null}}
                        onClick={() => {setState(2)}}>
                        <MessageSquare/>
                    </Button>
                </div>
            </Sider>
        ) 
    }
    else {
        return (
            <div className={styles.secondVersion}>
                {components}
                <Button
                    style={{backgroundColor: state !== 1 ? variables.colors.secondary : null}}
                    onClick={() => {setState(1)}}
                >
                    <Codesandbox/>
                </Button>
                <Button
                    style={{backgroundColor: state !== 2 ? variables.colors.secondary : null}}
                    onClick={() => {setState(2)}}>
                    <MessageSquare/>
                </Button>
            </div>
        )
    }
}

export default SiderComponent;