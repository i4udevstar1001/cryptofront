import {Button} from 'antd'
import {Info} from 'react-feather'
import propTypes from 'prop-types'
import styles from  './styles.module.sass'


const Toast =  (props) => (
    <div className={styles.alert}>
            <Info color={'white'}  className={styles.icon}/> 
            <div className={styles.center}>
                <span>{props.title}</span>
                <p>{props.caption}</p>
            </div>
        <Button type={'primary'} onClick={props.onClick} className={styles.button}>{props.buttonText}</Button>
    </div>
)

Toast.defaultProps = {
    title: propTypes.string.isRequired,
    caption: propTypes.string.isRequired,
    buttonText: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired
}

export default Toast 
