import React, {useEffect, useState} from 'react'
import sassStyles from './style.module.sass'
import {useSpring, animated} from 'react-spring'
import {Spin} from 'antd'
import logo from '../../Assets/ace-logo.png'
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar"
import variables from "../../../variables";
// import {useSelector} from "react-redux";
// import {render} from "@testing-library/react";

const useFold = () => {
    return useSpring({from: {opacity: 1}, to: {opacity: 0.7}})
}


const PlayerAccount = ({value}) => {
    return (
        <div className={sassStyles.playerAccount}>
            <img src={logo} alt=""/>
            <span>${value}</span>
        </div>
    )
}

const PlayerActions = React.memo(({type}) => {
        const springProps = useSpring({
            reset: true,
            delay: 1000,
            config: {
                duration: 800
            },
            from: {
                opacity: 1,
                top: '0px'
            },
            to: {
                opacity: 0,
                top: '-100px'
            }
        });

  
        
        const classNames = `${sassStyles.action} 
    ${type === 'CHECK' && sassStyles.check}
    ${type === 'FOLD' && sassStyles.fold}
    ${type === 'CALL' && sassStyles.call}
    ${type === 'RAISE' && sassStyles.raise}`

        return (
            <animated.div style={springProps} className={sassStyles.actionContainer}>
                <div className={classNames}>
                    {type}
                </div>
            </animated.div>
        )
}) 
    
    
    
const GreenNumbres = React.memo(({direction, value}) => {
    
        const from = {
            opacity: 1
        }
        from[direction] = '100px'

        const to = {
            opacity: 0,
        }
        to[direction] = '300px'
        
        const springProps = useSpring({
            reset: true,
            delay: 800,
            config: {
                duration: 1000
            },
            from,
            to,
            
        });
        
        return (
            <animated.div style={springProps} className={sassStyles.actionContainer}>
                <div className={sassStyles.number}>
                    <img src={logo} alt=""/>
                    <span>+${value}</span>
                </div>
            </animated.div>
        )
    
})

let intervalID

const Player = (props) => {
    const [loaded, setLoaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const fold = useFold()
    const {isDealer, infoPosition, isHisTurn, item} = props
    const styles = Object.assign(props.style, item?.action === 'FOLD' ? fold : null)
    // const renderActionAnimation = useRef(true)
    // const renderNumberAnimation = useRef(true)
    useEffect(() => {
        if (isHisTurn) {
            const time = 100
            intervalID = setInterval(() => {
                setProgress(prev => prev + 2)
            }, time)
        } else setProgress(100)
    }, [isHisTurn])
    // const onlyOneTime = useRef(true)
    // const changeOnlyOneTime = () => onlyOneTime.current = false
    

    useEffect(() => {
        if (progress === 100 && isHisTurn) {
            clearInterval(intervalID)
        }
    }, [progress, isHisTurn])

    const performAnimation = (item) => {
        if (!item.action) return false
        const type = item.action.type
        if (type === 'CALL' | type === 'RAISE')
            return true
        return false
    }


    return (
        <>
          
            <animated.div style={styles} className={sassStyles.container}>
                <CircularProgressbarWithChildren
                    value={progress}
                    strokeWidth={8}
                    background={true}
                    wid
                    styles={buildStyles({
                        backgroundColor: variables.colors.bgLight,
                        textColor: 'white',
                        pathColor: variables.colors.base,
                        trailColor: variables.colors.bgDark,
                    })}
                >
                    <div>
                        {
                            item === null ? "Empty" :
                                <img src={'https://picsum.photos/80'}
                                     style={loaded ? {} : {display: 'none'}}
                                     className={sassStyles.playerAvatar}
                                     onLoad={() => setLoaded(true)} alt=""
                                />
                        }
                        {loaded === false && <Spin size={'small'}/>}
                        {/*Animations included components*/}
                        <div className={infoPosition === 'top' ? sassStyles.infoTop : sassStyles.infoBottom}>
                            <PlayerAccount value={item.chips}/>
                        </div>
                        {isDealer && <div className={sassStyles.dealer}>D</div>}

                        {
                            item.action && item.action.type && (
                                <>
                                    <PlayerActions type={item.action.type}/>
                                </>
                            )
                        }
                        {
                            performAnimation(item) &&
                            <GreenNumbres
                                direction={props.numbersPosition}
                                value={item.action.value}
                            />
                        }

                    </div>
                </CircularProgressbarWithChildren>
            </animated.div>
        </>
    )
}

export default Player;