import propTypes from 'prop-types'
import styles from './styles.module.sass'
import aceLogo from '../../../../Assets/Images/icon-tiny.png'
const WalletTabController = (props) => (
    <div 
        className={`${styles.container} ${props.active === true && styles.active}`}
        onClick={props.onClick}
    >
        <span className={styles.title}>{props.title}</span>
        <div className={styles.topValue}>
            <img src={aceLogo} alt="ace logo"/>
            <span>{props.topValue} ACE</span>
        </div>
        <div className={styles.bottomValue}>
            <span>${props.bottomValue} USD</span>
        </div>
        {props.content}
    </div>
)

WalletTabController.defaultProps = {
    title: propTypes.string.isRequired,
    topValue: propTypes.number.isRequired,
    bottomValue: propTypes.number.isRequired,
    content: propTypes.element,
    onClick: propTypes.func.isRequired,
}

export default WalletTabController 
