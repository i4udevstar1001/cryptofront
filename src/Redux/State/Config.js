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
    round: 0,
    gameStage: null,
    turn: 0,
    maxBetAmount: 40,
    activePlayer: 0,
    performAnimation: true,
    btnStatus: false,
    curBet: 0,
    curPlayCash: 0,
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
        action: (state, action) => {
            const actionType = action.payload.type
            const playerIndex = action.payload.index
            const value = action.payload.value
            state.players?.forEach((item, index) => {
                if (playerIndex === index) {
                    item.action = {
                        type: actionType,
                        value: value,
                        flag: !item?.action?.flag
                    }
                    if (actionType === 'CALL' || actionType === 'RAISE' || actionType === 'FOLLOW') {
                        item.chips -= value
                        state.pot += value
                        state.curBet = value
                    }
                }
            })
            state.activePlayer++
            state.turn++;
            if( state.activePlayer === state.roomSize ) {
                state.activePlayer = 0
                state.turn = 0;
            }
            state.players?.forEach((item, index) => {
                if( state.activePlayer === index ) {
                    state.curPlayCash = item.chips
                    console.log(state.activePlayer)
                }
            })
        },
        turnAllCards:(state => {
            state.players?.forEach(player => {
                player.cards?.forEach(card => {
                    card.back = false
                })
            })
        }),
        updateDealer: ((state, action) => {
            state.dealer = action.payload
        }),
        updateActivePlayer: ((state, action) => {
            state.activePlayer = action.payload.playerNumber
            state.turn = action.payload.playerNumber
        }),
        updateBtnStatus: ((state, action) => {
            state.btnStatus = action.payload.status
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
    action, 
    turnAllCards, 
    stopPerformingAnimation, 
    updateDealer, 
    updateTableName, 
    updateRoomSize } = counterSlice.actions

export default counterSlice.reducer
