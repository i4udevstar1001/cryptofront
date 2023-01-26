import styles from './styles.module.sass'
import { useSelector } from "react-redux"
import logo from '../../Assets/ace-logo.png'

const Pot = () => {
    const potValue = useSelector(state => state.game.pot)
    return (
        <div className={styles.container}>
        <div className={styles.pot}>
            <img src={logo} alt=""/>
            <span>${potValue}</span>
        </div>
        </div>
    )
}

export default Pot;