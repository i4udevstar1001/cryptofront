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

const PlayerActions = React.memo(({type, flag}) => {
    const springProps = useSpring({
        reset: true,
        reverse: true,
        delay: 600,
        config: {
            duration: 1100
        },
        from: {
            opacity: 0.9,
            top: '0px'
        },
        to: [{
            opacity: 1,
            top: '-160px',
        }, {
            opacity: 0,
            top: '-60px',
        }]
    });
    
    const classNames = `${sassStyles.action}
    ${type === 'CHECK' && sassStyles.check}
    ${type === 'FOLD' && sassStyles.fold}
    ${type === 'CALL' && sassStyles.call}
    ${type === 'RAISE' && sassStyles.raise}`

        return (
            <animated.div style={springProps} className={sassStyles.actionContainer} key={flag}>
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
        from[direction] = '70px'

        const to = {
            opacity: 0,
        }
        to[direction] = '-400px'
        
        const springProps = useSpring({
            reset: true,
            delay: 800,
            config: {
                duration: 2000
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
    const {isDealer, infoPosition, isHisTurn, item, avatar} = props
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
        if (type === 'CALL' | type === 'RAISE' | type === 'FOLLOW')
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
                                <img src={avatar}
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
                            item.action && item.action.type && item.action.type !== 'FOLLOW' && (
                                <>
                                    <PlayerActions type={item.action.type} flag={!item.action?.flag}/>
                                </>
                            )
                        }
                        {
                            performAnimation(item) &&
                            <GreenNumbres
                                direction={props.numbersPosition}
                                value={item.action.value}
                                flag={!item.action?.flag}
                            />
                        }

                    </div>
                </CircularProgressbarWithChildren>
            </animated.div>
        </>
    )
}

export default Player;