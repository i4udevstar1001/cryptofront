import {Button, Modal, Col, Row} from 'antd'
import {useState} from 'react'
import swapred from '../../Assets/Images/swapred.png'
import './modal-stlyes.sass'
import Swap from '../../GlobalComponents/Swap'
import styles from './styles.module.sass'
import {X} from 'react-feather'
import {useMediaQuery} from "react-responsive";
import svg_swap from "../../Assets/Images/swap.svg"

const SwapModal = () => {
    const [visible, setVisible] = useState(false)
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' })
    const isPhone = useMediaQuery({ query: '(max-width: 414px)' })
    const modalWidth = isDesktop ? 985 : isPhone  ? '95%' : '90%'
    const modalHeight = isDesktop ? '615px' : isPhone ? '560px' : '670px'
    
    return (
        <>
            <Button type={'primary'} className={styles.button} onClick={() => {
                setVisible(true)
            }}>
                <img src={svg_swap} alt=""/>
            </Button>
            <Modal
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={modalWidth}
                footer={null}
                closable={false}
                wrapClassName={'swap-modal'}
                bodyStyle={{
                    height: modalHeight,
                    position: 'relative'
                }}
            >
                <X color={'white'} size={25} className={styles.close}/>
                <Row className={styles.row}>
                    <Col md={8} lg={12} xs={24}>
                        <img src={swapred} alt={'swap circle'} className={styles.swapCircle}/>
                    </Col>
                    <Col md={16} lg={12} xs={24}>
                        <Swap/>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default SwapModal;