import styles from './styles.module.sass'

const TableCards = () => {   
    const spots = []
    
    for(let c =1; c<=5; c++){
        spots.push(
            <div className={styles.spot} key={c} style={{marginLeft: 10 + 'px'}}>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            {spots}
        </div>
    )
}

export default TableCards;