import {createSlice} from '@reduxjs/toolkit'
import {generateCards} from "../../Game/utils/Cards"


const initialState = {
    availableCards: generateCards(),
    tableCards: [],
    tableName: 'Arian',
    roomSize: 5,
    players: [],
    dealer: 1,
    pot: 0,
    round: 1,
    gameStage: null,
    turn: 0,
    maxBetAmount: 40,
    activePlayer: 2,
    performAnimation: true,
    btnStatus: false,
    curBet: 0,
    curPlayCash: 0,
    isCall: true,
}

export const counterSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initiatePlayers: (state, action) => {
            for (let x = 0; x < state.roomSize; x++) {
                if (action.payload[x]) {
                    state.players.push(action.payload[x])
                    if (action.payload[x].activePlayer) {
                        state.activePlayer = x
                    }
                } else state.players.push(null)
            }
        },
        startGame: state => {
            state.gameStage = 'pre-flop'
        },
        stopPerformingAnimation: state => {
            state.performAnimation = false 
        },
        resetRound: (state, action) => {
            // reset
        },
        assignCardsToPlayer: (state, action) => {
            state.players?.forEach((item, index) => {
                if (item) {
                    item.cards = [state.availableCards.pop(), state.availableCards.pop()]
                    item.cards?.forEach(card => {
                        if(index === 2)
                            card.back = false
                        else card.back = true
                    })
                }
            })
        },
        addCardsToTable: (state, action) => {
            // const tableCards = state.tableCards.concat(action.payload)
            const tableCards = state.tableCards.concat(state.availableCards.pop())
            state.tableCards = tableCards
        },
        pokerAction: (state, action) => {
            const actionType = action.payload.type
            const playerIndex = action.payload.index
            const value = action.payload.value
            state.players?.forEach((item, index) => {
                if( playerIndex === index ) {
                    state.isCall = true
                    if( actionType === 'CALL' || actionType === 'FOLLOW' ) {
                        // if raise, it will need to consider
                        // all in
                        if( item.action?.type === 'FOLLOW' && value === (state.round * 40) ) {
                            item.chips -= state.round * 20
                            state.pot += state.round * 20
                            state.curBet = value

                            item.action = {
                                type: actionType,
                                value: state.round * 20,
                                flag: !item?.action?.flag
                            }
                            state.isCall = false
                        } if( item.action?.type === 'FOLLOW' ) {
                            item.chips -= state.curBet - state.round * 20
                            state.pot += state.curBet - state.round * 20
                            state.curBet = value

                            item.action = {
                                type: actionType,
                                value: state.curBet - state.round * 20,
                                flag: !item?.action?.flag
                            }
                        }else {
                            item.chips -= value
                            state.pot += value
                            state.curBet = value

                            item.action = {
                                type: actionType,
                                value: value,
                                flag: !item?.action?.flag
                            }
                        }
                    } else if( actionType === 'RAISE' ) {
                        state.curBet += value
                        item.chips -= state.curBet
                        state.pot += state.curBet
                        item.action = {
                            type: actionType,
                            value: value,
                            flag: !item?.action?.flag
                        }
                    } else {
                        item.action = {
                            type: actionType,
                            value: value,
                            flag: !item?.action?.flag
                        }
                    }
                }
            })
            state.activePlayer = (state.activePlayer + 1) % state.roomSize
            state.turn = (state.turn + 1) % state.roomSize

            let isCheck = true

            state.players?.forEach((item, index) => {
                if( state.activePlayer === index ) {
                    state.curPlayCash = item.chips
                    if( item.action?.type === 'FOLD' ) {
                        state.activePlayer = (state.activePlayer + 1) % state.roomSize
                        state.turn = (state.turn + 1) % state.roomSize
                    }
                }
                
                if( item.action?.value !== state.curBet && item.action?.type !== 'FOLD' )
                    isCheck = false
                
            })

            if( state.isCall === false || isCheck ) {
                state.isCall = false
            } else {
                state.isCall = true
            }
        },
        initialPlayerCards:(state => {
            state.players?.forEach(player => {
                if( player.action?.type !== 'FOLD' ) {
                    player.action = {
                        type: '',
                        value: 0,
                        flag: !player?.action?.flag
                    }
                }
            })
            state.curBet = 0;
            state.isCall = false;
            // state.activePlayer = (state.dealer + 1) % state.roomSize;
        }),
        removePlayerCards:(state => {
            state.tableCards = []
            state.availableCards = generateCards()
            state.dealer = (state.dealer + 1) % state.roomSize
            state.players?.forEach(player => {
                player.action = {
                    type: '',
                    value: 0,
                    flag: !player?.action?.flag
                }
                player.cards = []
            })
            state.curBet = 0
            state.isCall = false
            state.activePlayer = (state.dealer + 1) % state.roomSize;
            state.turn = (state.dealer + 1) % state.roomSize;
        }),
        turnAllCards:(state => {
            state.players?.forEach(player => {
                player.cards?.forEach(card => {
                    card.back = false
                })
            })
        }),
        updateDealer: ((state, action) => {
            state.dealer = action.payload.dealer
        }),
        updateBtnStatus: ((state, action) => {
            state.btnStatus = action.payload.status
        }),
        updateActivePlayer: ((state, action) => {
            state.activePlayer = action.payload.playerNumber
            state.turn = action.payload.playerNumber
        }),
        updateTableName: ((state, action) => {
            state.tableName = action.payload
        }),
        updateRoomSize: ((state, action) => {
            state.roomSize = action.payload 
        })
    },
})

export const {
    initiatePlayers, 
    startGame, 
    updateActivePlayer, 
    updateBtnStatus, 
    assignCardsToPlayer, 
    addCardsToTable, 
    pokerAction, 
    turnAllCards, 
    removePlayerCards,
    initialPlayerCards,
    stopPerformingAnimation, 
    updateDealer, 
    updateTableName, 
    updateRoomSize } = counterSlice.actions

export default counterSlice.reducer
