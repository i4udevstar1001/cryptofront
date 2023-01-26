import {useState} from 'react'
import AceChart from './Compnents/AceChart'
import {Col, Row} from 'antd'
import Swap from '../../GlobalComponents/SwapModal'
import CircularProgressbar from './Compnents/CircularProgressbar'
import styles from './styles.module.sass'
import {useMediaQuery} from 'react-responsive'
import variables from '../../variables'
import WalletTabController from './Compnents/WalletTabController'

const Wallet = () => {
    const isDesktop = useMediaQuery({query: `(min-width: ${variables.breakpoints.desktop})`})
    const isPhone = useMediaQuery({query: `(max-width: ${variables.breakpoints.phone})`})


    const [state, setState] = useState('STAKED_BALANCE')

    function isActive(title) {
        return state === title
    }

    // <CircularProgressbar/>

    const Progress = (
        <WalletTabController
            title={'Total Balance'}
            topValue={500}
            bottomValue={23000}
            content={<CircularProgressbar/>}
        />
    )

    const Available = (
        <WalletTabController
            title={'Available Balance'}
            topValue={400}
            bottomValue={18400}
            active={isActive('AVAILABLE_BALANCE')}
            onClick={() => {
                setState('AVAILABLE_BALANCE')
            }}
        />
    )

    const Stacked = (
        <WalletTabController
            title={'Staked Balance'}
            topValue={400}
            bottomValue={18400}
            active={isActive('STAKED_BALANCE')}
            onClick={() => {
                setState('STAKED_BALANCE')
            }}
        />
    )


    return (
        <>
            <Row gutter={[{xs: 8, sm: 16, md: 40, lg: 32}, {xs: 24, sm: 16, md: 40, lg: 32}]} justify="space-between"
                 className={'wallet'}>
                <Col xl={16} md={24} sm={24} style={{width: "100%"}}>
                    <AceChart type={state}/>
                </Col>
                {isDesktop && (
                    <>
                        <Col span={8}>
                            {Progress}
                        </Col>
                        <Col span={9}>
                            {Available}
                        </Col>
                        <Col span={9}>
                            {Stacked}
                        </Col>
                        <Col span={6}>
                            <Swap/>
                        </Col>
                    </>
                )}
                {!isDesktop && !isPhone && (
                    <>
                        <Col span={24}>
                            <Row gutter={32} style={{height: '500px'}}>
                                <Col span={12} className={styles.height100}>{Progress}</Col>
                                <Col span={12}>
                                    <Col span={24}>{Available}</Col>
                                    <Col style={{marginTop: '28px'}} span={24}>{Stacked}</Col>
                                </Col>
                                <Col span={24}><Swap/></Col>
                            </Row>
                        </Col>

                    </>

                )}
                {isPhone && (
                    <>
                        <Col span={24} className={styles.progress}>{Progress}</Col>
                        <Col span={12}>{Available}</Col>
                        <Col span={12}>{Stacked}</Col>
                        <Col span={24}><Swap/></Col>
                    </>
                )}

            </Row>
        </>
    )
}

export default Wallet;