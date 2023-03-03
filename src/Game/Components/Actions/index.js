import {useState} from 'react'
import styles from './styles.module.sass'
import { useSelector, useDispatch } from "react-redux";
import { 
    assignCardsToPlayer, updateBtnStatus, 
    updateActivePlayer, pokerAction, 
    startGame, addCardsToTable, 
    removePlayerCards, initialPlayerCards
} from "../../../Redux/State/Config"
import { Slider } from 'antd'
import Sider from '../../Components/Sider'
import { X } from 'react-feather'
import { useMediaQuery } from "react-responsive";
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
                    dispatch(pokerAction({type: 'RAISE', value: value, index: index})) 
                return ({})
            })
        }
    }

    const handleCall = () => {
        setState('CALL')
        setShowRange(false)
        let isAllCall = true
        let playerBet = 0
        appState.players.map((player, index) => {
            if(appState.activePlayer === index)
                dispatch(pokerAction({type: 'CALL', value: appState.curBet, index: index})) 
            if( playerBet === 0 ) playerBet = player.action?.value
            if( player.action?.value !== playerBet && player.action?.type !== 'FOLD' )
                isAllCall = false
            return ({})
        })
        if( isAllCall ) {
            onAssignTableCard();
            dispatch(updateBtnStatus({status: false}))
            setTimeout(() => {
                dispatch(initialPlayerCards(appState))
                dispatch(updateBtnStatus({status: true}))
            }, 2500)
        }
    }

    const handleCheck = () => {
        setState('CHECK')
        let isAssignTableCards = false
        let isAllCheck = true
        appState.players.map((player, index) => {
            if(appState.activePlayer === index) {
                if( player.action?.type === 'FOLLOW' ) {
                    isAssignTableCards = true;
                }
                dispatch(pokerAction({type: 'CHECK', value: 0, index: index})) 
            } else if( player.action?.type !== 'CHECK' && player.action?.type !== 'FOLD' )
                isAllCheck = false
            return ({})
        })
        setShowRange(false)
        if( isAssignTableCards || isAllCheck ) {
            onAssignTableCard();
            dispatch(updateBtnStatus({status: false}))
            setTimeout(() => {
                dispatch(initialPlayerCards(appState))
                dispatch(updateBtnStatus({status: true}))
            }, 2500)
        }
    }

    const handleFold = () => {
        setState('FOLD')
        setShowRange(false)
        appState.players.map((player, index) => {
            if(appState.activePlayer === index) {
                dispatch(pokerAction({type: 'FOLD', value: 0, index: index})) 
            }
            return ({})
        })
    }

    // assign table cards
    const onAssignTableCard = () => {
        dispatch(updateActivePlayer({playerNumber: (appState.dealer + 1) % appState.roomSize}))
        if( appState.tableCards.length < 1 ) {
            dispatch(addCardsToTable())
            dispatch(addCardsToTable())
        }
        if( appState.tableCards.length < 5 )
            dispatch(addCardsToTable())
        else
            setTimeout(() => { onNewRound() }, 1000)
    }

    // reset new round status
    const onNewRound = () => {
        dispatch(startGame())
        dispatch(updateBtnStatus({status: false}))
        dispatch(removePlayerCards(appState))

        setTimeout(()=>{
            dispatch(pokerAction({type: 'FOLLOW', value: 20, index: (appState.dealer+2) % appState.roomSize}))
        }, "2000");
        setTimeout(()=>{
            dispatch(pokerAction({type: 'FOLLOW', value: 40, index: (appState.dealer+3) % appState.roomSize}))
            dispatch(updateActivePlayer({playerNumber: (appState.dealer+4) % appState.roomSize}))
        }, "3000");
        setTimeout(()=>{
            dispatch(assignCardsToPlayer(appState.players))
            dispatch(updateBtnStatus({status: true}))
        }, "4000")
    }
    
    return (
        <div className={styles.container}>
            {appState.btnStatus && (
                <div className={styles.buttons}>
                    <button className={state === 'RAISE' ? styles.active : ''} onClick={handleRaise}>{raiseTxt}</button>
                    {appState.isCall === true ? (
                        <button className={state === 'CALL' ? styles.active : ''} onClick={handleCall}>CALL</button>
                    ) : (
                        <button className={state === 'CHECK' ? styles.active : ''} onClick={handleCheck}>Check</button>
                    )}
                    <button className={state === 'FOLD' ? styles.active : ''} onClick={handleFold}>FOLD</button>
                </div>
            )}
            <div className={styles.buttons}>
                <button className={styles.fold} onClick={onNewRound}>New Round</button>
            </div>
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