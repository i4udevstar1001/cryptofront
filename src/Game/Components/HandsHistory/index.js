import { useState, useEffect } from 'react'
import styles from './styles.module.sass'
import Card from '../../Components/Card'
// import { X } from 'react-feather'
import arrowLeft from '../../Assets/hands-history-arrow-left.png'
import arrowRight from '../../Assets/hands-history-arrow-right.png'

   const data = [{player: 'Arian nargesi', id: '00005', win: true, amount: '+$1400', hands: [{
           type: '♥',
           value: 3,
       },
           {
               type: '♦',
               value: 2,
           }], cards: [
            {
                type: '♥',
                value: 3,
            },
            {
                type: '♦',
                value: 2,
            },
            {
                type: '♠',
                value: 6,
            },
            {
                type: '♣',
                value: 1,
            },
            {
                type: '♦',
                value: 'A',
            },
        ]},
       {player: 'Arian nargesi', id: '00005', win: true, amount: '+$1400', hands: [{
               type: '♥',
               value: 3,
           },
               {
                   type: '♦',
                   value: 2,
               }], cards: [
               {
                   type: '♥',
                   value: 3,
               },
               {
                   type: '♦',
                   value: 2,
               },
               {
                   type: '♠',
                   value: 6,
               },
               {
                   type: '♣',
                   value: 1,
               },
               {
                   type: '♦',
                   value: 'A',
               },
           ]},]

const HandsHistory = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage ,setMaxPage] = useState(null) 
    
    useEffect(() => {
        setMaxPage(10) 
    }, [])
     
    return (
        <div className={`${styles.container} ${props.desktop ? {} : styles.absolute}`}>
            <div className={styles.top}>
                <span>Previous Hand History</span>
            </div>
            <div>
            {data.map(item => {
                return (
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <div>
                                <div className={styles.cards}>
                                    {item.hands.map((card, index) => {
                                        return (
                                            <div style={{marginLeft: index * 45 + 'px', position: 'relative'}}>
                                                <Card
                                                    type={card.type}
                                                    value={card.value}
                                                    back={false}
                                                    key={index}
                                                    noAnimation
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <p>{item.player}</p>
                                <p>ID: {item.id}</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.top}>
                                <p>Pair</p>
                                <p style={{color: item.win ? '#06BD39' : '#F03C3D'}}>{item.amount}</p>
                            </div>
                            <div className={styles.cards}>
                                {item.cards.map((card, index) => {
                                    return (
                                        <div style={{marginLeft: index * 45 + 'px', position: 'relative'}}>
                                            <Card
                                                type={card.type}
                                                value={card.value}
                                                back={false}
                                                key={index}
                                                noAnimation
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className={styles.bottom}>
                <img src={arrowLeft} onClick={() => {
                    console.log('Im working')
                    if(currentPage < maxPage)
                        setCurrentPage(currentPage +1)
                }} alt=""/>
                <span>{currentPage}/{maxPage}</span>
                <img src={arrowRight} onClick={() => {
                    if(currentPage > 1){
                        setCurrentPage(currentPage -1)
                    }
                }} alt=""/>
            </div>
        </div>
    )
}

export default HandsHistory;