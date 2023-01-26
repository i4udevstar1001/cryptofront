import propTypes from 'prop-types'
import {Progress} from "antd"
import styles from './styles.module.sass'

const TableLobbyTabController = (props) => (
    <div 
        className={`${styles.container} ${props.active === true && styles.active}`}
        onClick={props.onClick}
    >
        <h1>{props.title}</h1>
        <p>{props.label}</p>
        <p>{props.progress}%</p>
        <Progress 
            percent={props.progress} 
            showInfo={false}
        />
    </div>
)

TableLobbyTabController.defaultProps = {
    title: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    active: propTypes.bool,
    onClick: propTypes.func.isRequired,
    progress: propTypes.number.isRequired
}

export default TableLobbyTabController
