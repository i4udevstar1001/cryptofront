import styles from './styles.module.sass'
import {useSpring, animated} from 'react-spring'
import { useMediaQuery } from 'react-responsive'
import {useSelector, useDispatch} from "react-redux"
// import {useEffect} from "react"
import {stopPerformingAnimation} from "../../../Redux/State/Config";

let renderCount = 0

const Card = (props) => {
    const state = useSelector(state => state.game)
    const isPhone = useMediaQuery({ query: '(max-width:800px)' })
    const performAnimation = state.performAnimation
    const dispatch = useDispatch()
    
    if( state.performAnimation && renderCount === state.roomSize * 4)
        dispatch(stopPerformingAnimation())
    
    const type = props.type
    const value = props.value
    // const animationType = props.animationType
    let color = 'red'
    
    if (type === '♦' || type === '♥')
        color = 'red'
    else
        color = 'black'    
    
    const preFlopAnimation = useSpring({
        opacity: 1,
        delay: performAnimation ? props.delay : 0, 
        reset: false,
        transform: props.to,
        from: {
            opacity: 0,
            zIndex: 2,
            transform: performAnimation ? isPhone ? 'translate(0px, -350px) rotate(180deg)' : 'translate(140px, -220px) rotate(180deg)' : props.to 
        }
    });

    const rotateAnimation = useSpring({
        reset: true,
        transform: props.back ? 'rotateY(180deg)' : 'rotateY(0deg)',
        from: {
            transform: props.back ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }
    });
    
    return (
        <animated.div style={!props.noAnimation ? preFlopAnimation : null } className={styles.container}>
            <div className="flip-card">
                <animated.div className="flip-card-inner" style={rotateAnimation}>
                    <animated.div className="flip-card-front">
                        <div className={styles.top}>
                            <span style={{color}}>{value}</span>
                            <span style={{color}}>{type}</span>
                        </div>
                        <div className={styles.body} style={{color}}>{type}</div>
                        <div className={styles.bottom}>
                            <span style={{color}}>{value}</span>
                            <span style={{color}}>{type}</span>
                        </div>
                    </animated.div>
                    <div className="flip-card-back">
                    </div>
                </animated.div>
            </div>
        </animated.div>

    )
}

export default Card;