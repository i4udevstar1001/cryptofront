// get and set game stage 
// start game 
// end game 
// winner 
// updatePot
// 
import dealerLarge from '../../Assets/dealer-large.png'
import dealerSmall from '../../Assets/dealer-small.png'
import {useDispatch, useSelector} from "react-redux"
// import {startGame, assignCardsToPlayer, initiatePlayers, addCardsToTable} from "../../../Redux/State/Config"
import {
    pokerAction, startGame, 
    initiatePlayers, 
    assignCardsToPlayer, 
    updateActivePlayer,
    updateBtnStatus 
} from "../../../Redux/State/Config"
import {useEffect, useState} from "react";
import getPositions from '../../CardsPositions'
import Card from '../Card'
import {useMediaQuery} from "react-responsive";
import variables from '../../../variables'
function newGame() {
    return [
        {
            playerID: '645467514',
            tableID: 1,
            avatar: 'https://picsum.photos/101',
            name: 'Arian',
            activePlayer: true,
            chips: 1000,
        },
        {
            playerID: '645467516',
            tableID: 2,
            avatar: 'https://picsum.photos/102',
            name: 'Anick',
            chips: 1000,
        },
        {
            playerID: '645467513',
            tableID: 3,
            avatar: 'https://picsum.photos/113',
            name: 'ddd',
            chips: 1000,
        },
        {
            playerID: '645467512',
            tableID: 4,
            avatar: 'https://picsum.photos/114',
            name: 'ddd',
            chips: 1000,
        },
        {
            playerID: '645467516',
            tableID: 5,
            avatar: 'https://picsum.photos/115',
            name: 'ddd',
            chips: 1000,
        },
        {
            playerID: '645467511',
            tableID: 6,
            avatar: 'https://picsum.photos/110',
            name: 'ddfffd',
            chips: 1000,
        },
        {
            playerID: '645467519',
            tableID: 7,
            avatar: 'https://picsum.photos/116',
            name: 'dddasdfsdfsdfff',
            chips: 1000,
        },
        {
            playerID: '645467516',
            tableID: 8,
            avatar: 'https://picsum.photos/117',
            name: 'ddasdfsdfd',
            chips: 1000,
        },
    ]
}

const Dealer = () => {
    const dispatch = useDispatch()
    const [startAnimation, setStartAnimation] = useState(false)
    const state = useSelector(state => state.game)
    const positions = getPositions(state.roomSize)
    const isDesktop = useMediaQuery({query: `(min-width: ${variables.breakpoints.desktop})`})
    const isPhone = useMediaQuery({ query: '(max-width: 800px)' })
    // socket connection
        
    
    useEffect(() => {
        if(state.gameStage === null){
            const players = newGame()
            dispatch(startGame())
            dispatch(initiatePlayers(players))
            setTimeout(()=>{
                dispatch(pokerAction({type: 'FOLLOW', value: state.round * 20, index: (state.dealer+1) % state.roomSize}));
            }, "2000");
            setTimeout(()=>{
                dispatch(pokerAction({type: 'FOLLOW', value: state.round * 40, index: (state.dealer+2) % state.roomSize}));
                dispatch(updateActivePlayer({playerNumber: (state.dealer+3) % state.roomSize}));
            }, "3000");
            setTimeout(()=>{
                dispatch(assignCardsToPlayer(players));
                dispatch(updateBtnStatus({status: true}));
            }, "4000");
        }
    }, [dispatch, state])
    
    
    
    
    
    useEffect(() => {
        if( state.players[0]?.cards )
            setStartAnimation(true)
    }, [state.players])
    let delay = 0
    return (
        <>
            <div className={'dealer-container'}>
                <img src={isDesktop ? dealerLarge : dealerSmall} className={'dealer-image'} alt=""/>
            </div>
            {startAnimation && (
                state.players.map((player, playerIndex) => {
                    delay += 400
                    if(!player) return ({})
                    return player?.cards?.map((card, cardIndex) => {
                        const style = isPhone ? positions.phone[playerIndex].cards[cardIndex]: positions.desktop[playerIndex].cards[cardIndex]

                        let startPosition
                        if(state.gameStage === null)
                            startPosition =  'translate(140px, -220px) rotate(180deg)'
                        else startPosition = style
                     
                        return (
                            <Card
                                back={card.back}
                                type={card.name} 
                                value={card.value}
                                from={startPosition}
                                to={style}
                                key={cardIndex}
                                delay={cardIndex === 0 ? delay : delay + 100}
                            />
                        )
                    })
                })
            )}
            {
                state.tableCards.map((card, index) => {
                    const to = isPhone ? `translate(${41 + (40 * index)}px, 153px) rotate(0deg)`: `translate(${193 + (60 * index)}px, 33px) rotate(0deg)`
                    return (
                        <Card
                            animationType={'TABLE-CARD'}
                            to={to}
                            key={index}
                            type={card.name}
                            value={card.value}
                            delay={index * 100}
                        />
                    )
                })
            }
        </>
    )
}

export default Dealer;