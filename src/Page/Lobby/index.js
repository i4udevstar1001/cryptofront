import { useState } from 'react'
import {Col, Row} from 'antd'
import TableLobbyTabController from './Components/LobbyTabContoller'
import TableLobby from './Components/TableLobby'
import AceLive from './Components/AceLive'
import './Lobby.sass'

const Lobby = () => {
    const [state, setState] = useState('LIVE_GAME')
    
    function isActive(title) {
        return state === title 
    }
    
    return (
        <>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 24, sm: 16, md: 24, lg: 32 }]} justify="space-between" className={'lobby'}>
                <Col span={8} className={'gutter-row'}>
                    <TableLobbyTabController
                        title={'LIVE GAME'}
                        label={'Preference level'}
                        progress={50}
                        active={isActive('LIVE_GAME')}
                        onClick={() => {setState('LIVE_GAME')}}
                    />
                </Col>
                <Col span={8} className={'gutter-row'}>
                    <TableLobbyTabController
                        title={'PLAY LATER'}
                        label={'Preference level'}
                        progress={50}
                        active={isActive('PLAY_LATER')}
                        onClick={() => {setState('PLAY_LATER')}}
                    />
                </Col>
                <Col span={8} className={'gutter-row'}>
                    <TableLobbyTabController
                        title={'TOURNAMENTS'}
                        label={'Preference level'}
                        progress={50}
                        active={isActive('TOURNAMENTS')}
                        onClick={() => {setState('TOURNAMENTS')}}
                    />
                </Col>
                <Col xl={17} lg={24} style={{width: '100%'}}>
                    <TableLobby type={state} />
                </Col>
                <Col xl={7} lg={24} style={{width: '100%'}}>
                    <AceLive/>
                </Col>
            </Row>
        </>
    )
}

export default Lobby;