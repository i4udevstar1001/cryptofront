import {useState} from 'react'
import styles from './styles.module.sass'
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../Redux/State/Config"
import { Slider } from 'antd'
import Sider from '../../Components/Sider'
import { X } from 'react-feather'
import {useMediaQuery} from "react-responsive";
import variables from "../../../variables";

const Actions = (props) => {
    const appState = useSelector(state => state.game)
    const dispatch = useDispatch()
    const [state, setState] = useState()
    const [showRange, setShowRange] = useState(false)
    const [value, setValue] = useState(40)
    const [raiseTxt, setRaiseTxt] = useState('RAISE');
    const isDesktopOrLaptop = useMediaQuery({
        query: `(max-width: ${variables.breakpoints.desktop})`
    })
    const handleRaise = () => {
        if (showRange === false)
            setShowRange(true)
        else {
            setState('RAISE')
            
            setShowRange(false)
            appState.players.map((player, index) => {
                if(appState.activePlayer === index)
                    dispatch(action({type: 'RAISE', value: value, index: index})) 
                return ({})
            })
        }
    }

    const handleCall = () => {
        setState('CALL')
        setShowRange(false)
        appState.players.map((player, index) => {
            if(appState.activePlayer === index)
                dispatch(action({type: 'CALL', value: 40, index: index})) 
            return ({})
        })
    }

    const handleCheck = () => {
        setState('CHECK')
        setShowRange(false)
        appState.players.map((player, index) => {
            if(appState.activePlayer === index)
                dispatch(action({type: 'CHECK', value: 0, index: index})) 
            return ({})
        })
    }

    const handleFold = () => {
        setState('FOLD')
        setShowRange(false)
        appState.players.map((player, index) => {
            if(appState.activePlayer === index) {
                dispatch(action({type: 'FOLD', value: 0, index: index})) 
            }
            return ({})
        })
    }
    
    return (
        <div className={styles.container}>
            {appState.btnStatus && (
                <div className={styles.buttons}>
                    <button className={state === 'RAISE' ? styles.active : ''} onClick={handleRaise}>{raiseTxt}</button>
                    <button className={state === 'CALL' ? styles.active : ''} onClick={handleCall}>CALL</button>
                    <button className={state === 'CHECK' ? styles.active : ''} onClick={handleCheck}>Check</button>
                    <button className={state === 'FOLD' ? styles.active : ''} onClick={handleFold}>FOLD</button>
                </div>
            )}
            <div className={styles.sider}>
                {isDesktopOrLaptop && <Sider/>}
            </div>
            {showRange && (
                <div className={styles.range}>
                    <div className={styles.top}>
                        <X onClick={() => setShowRange(false)}/>
                        <p>${value}</p>
                    </div>
                        {/* <Slider vertical defaultValue={props.default} onChange={value => setValue(value)} min={props.min} max={props.max}/> */}
                        <Slider vertical defaultValue={appState.curBet} onChange={value => {
                            setValue(value)
                            if( value === appState.curPlayCash )
                                setRaiseTxt('ALL IN')
                            else
                                setRaiseTxt('RAISE')
                        }} min={40} max={appState.curPlayCash}/>
                </div>
            )}

        </div>
    )
}

export default Actions;