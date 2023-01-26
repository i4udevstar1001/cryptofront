import { useSpring, animated } from 'react-spring'
import { useEffect, useState } from 'react'
import styles from './styles.module.sass'
import { ChevronDown, ChevronUp } from "react-feather"
import { Button, Col, Row } from 'antd'
import {useMediaQuery} from 'react-responsive'
// import variables from "../../../variables"
import Countdown from '../../Components/Countdown'

const Accordion = () => {
    const [open, setOpen] = useState(false)
    const isPhone = useMediaQuery({
        query: `(max-width: 800px)`
    })
    const [spring, api] = useSpring(() => ({
        from: { opacity: 0, height: isPhone ? 150 : 258, overflow: "hidden" },
        to: {
            height: 0,
            opacity: 0,
            overflow: "hidden"
        }
    }));

    useEffect(() => {
        api.start( open ? { opacity: 1, height: isPhone? 150 : 258, overflow: "unset" } : { opacity: 0, height: 0, overflow: "hidden" }
        );
    }, [open, api, isPhone]);
    
    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
            <Button onClick={() => setOpen(!open)} className={`${styles.button} ${!open && styles.close}`}>
                {!isPhone && 'Other games'} {open ? <ChevronUp  /> : <ChevronDown/> }
            </Button>
            </div>
            <animated.div
                style={{
                    opacity: spring.opacity,
                    height: spring.height,
                    overflow: spring.overflow 
                }}
            >
                <Row className={styles.row}>
                    <Col span={12}>
                        <Countdown roomName={'ACE #3'} label={'Player later'} date={new Date() + 5000}/>
                    </Col>
                    <Col span={12} className={styles.textLight}>
                        <p>You don't have any pending game</p> 
                    </Col>
                </Row>
            </animated.div>
        </div>
    )
}

export default Accordion;