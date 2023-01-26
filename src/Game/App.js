// import {useRef, useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
// import {action, assignCardsToPlayer, turnAllCards} from "../Redux/State/Config"
import {action} from "../Redux/State/Config"
import './App.sass'
import Player from './Components/Player'
import Dealer from './Components/Dealer'
import Actions from './Components/Actions'
import Pot from './Components/Pot'
import TableCards from './Components/TableCards'
import Accordion from './Components/Accordion' 
import getPositions from './CardsPositions'
import { useMediaQuery } from 'react-responsive'
// import variables from "../variables";
// import Countdown from './Components/Countdown'
import './styles.sass'
import { Button } from 'antd'

const GameApp = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.game)
    const isPhone = useMediaQuery({ query: '(max-width: 800px)' })
    // const {players, bigBlindIndex, smallBlindIndex} = state
    const {players} = state
    const isTabletOrPhone = useMediaQuery({ query: '(max-width: 1199px)' })    
        
    
    // const onAssignCard = () => {
    //     dispatch(assignCardsToPlayer())
    // }
 

    const positions = getPositions(state.roomSize)
    
    return (
        <>
            <div className={'table-name-container'}>
                <Button onClick={() => dispatch(action({type: 'CALL', value: 100, index: 2}))}>
                    {state.tableName}
                </Button>
            </div> 
            <div className={'container'}>
                <Dealer/>
                <Pot />
                <div className={'brand'}>
                    <h1>CRYPTOACES.</h1>
                    <h2>CLUB</h2>
                </div>
                <TableCards/>   
                { players.length && players.map((item, index) => {
                        const style = isPhone ?  positions.phone[index].player : positions.desktop[index].player
                    
                    if(!item) return ({}) 
                    return (
                        <Player
                            item={item}
                            chips={item.chips}
                            style={style}
                            key={index}
                            numbersPosition={isPhone ?  positions.phone[index].position : positions.desktop[index].position}
                            isDealer={state.dealer === index}
                            isHisTurn={state.turn === index}
                            infoPosition={isPhone ? positions.phone[index].info : positions.desktop[index].info}
                        />
                    )
                })}
            </div>
            {state.turn === state.activePlayer && <Actions/>}
            {isTabletOrPhone && <Accordion/>  }
        </>
    )
}

export default GameApp;