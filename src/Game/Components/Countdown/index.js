import styles from './styles.module.sass'
import Countdown from 'react-countdown';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <h3>Completed</h3>;
    } else {
        // Render a countdown
        return <p>{hours}:{minutes}:{seconds}</p>;
    }
};

const CountdownComponent = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>{props.label}</div>
            <div className={styles.body}>
                <h1>{props.roomName}</h1>
                <h2>Play in</h2>
                <Countdown
                    date={Date.now() + 50000}
                    renderer={renderer}
                />
            </div>
        </div>
    )
}

export default CountdownComponent;