import React, {useEffect} from 'react'
// import {Table, Button} from 'antd'
import {Table} from 'antd'
import {useDispatch, useSelector} from "react-redux"
import propTypes from 'prop-types'
// import {Play, Star} from 'react-feather'
import {Star} from 'react-feather'
import Box from '../../../../GlobalComponents/Box'
import styles from './styles.module.sass'
import playNow from '../../../../Assets/Images/play-now.png'
const fakeApi = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.parse('{"tables":[{"id":"x1","tableInfo":{"name":"Ace Live","thumbnail":"https://picsum.photos/90/70"},"stake":"$15000","names":["Herry","John","Harry","Jane"],"stakes":["$600","$300","$700","$400"],"maxPlayer":5,"rating":5},{"id":"x2","tableInfo":{"name":"Ace Live","thumbnail":"https://picsum.photos/90/70"},"stake":"$15000","names":["Herry1","John1","Harry1","Jane1"],"stakes":["$600","$300","$700","$400"],"maxPlayer":5,"rating":5},{"id":"x3","tableInfo":{"name":"Ace Live","thumbnail":"https://picsum.photos/90/70"},"stake":"$15000","names":["Herry","John","Harry","Jane"],"stakes":["$600","$300","$700","$400"],"maxPlayer":5,"rating":5},{"id":"x4","tableInfo":{"name":"Ace Live","thumbnail":"https://picsum.photos/90/70"},"stake":"$15000","names":["Herry","John","Harry","Jane"],"stakes":["$600","$300","$700","$400"],"maxPlayer":5,"rating":5},{"id":"x5","tableInfo":{"name":"Ace Live","thumbnail":"https://picsum.photos/90/70"},"stake":"$15000","names":["Herry","John","Harry","Jane"],"stakes":["$600","$300","$700","$400"],"maxPlayer":5,"rating":5}]}'))
        }, 500)
    })
}
const TableName = (props) => {
    return (
        //TODO pick better class names
        <div className={styles.tableNameBox} style={{

            display: 'flex'
        }}>
            <div className={styles.tableName}>
                <img src={'https://picsum.photos/97/74'} alt=""/>
                <div className={styles.tableNameOverlay}>#1</div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: "column",
                textAlign: 'left'
            }}>
                <span className={'bold'}>ACE LIVE</span>
                <span className={'bold warning'}>Online</span>
                <span className={'bold'}>5 Players</span>
            </div>
        </div>
    )
}
// const PlayNow = (props) => {
//     return (
//         <Button className={styles.playNowButton}>
//             <Play color={'white'} size={18}/>
//             <span>Play Now</span>
//         </Button>
//     )
// }


function getColumns(type) {
    return [
        {
            title: 'Table Name',
            dataIndex: 'tableInfo',
            key: 'tableInfo',
            render: data => <TableName data={data}/>
        },
        {
            title: 'Stake',
            dataIndex: 'stake',
            key: 'stake',
            render: data => <span className={'bold'}>{data}</span>
        },
        {
            title: 'Players',
            dataIndex: 'names',
            key: 'names',
            render: data => <span className={'bold'}>{data.length}/5</span>
        },
        {
            title: type === 'PLAY_LATER' ? 'Time' : 'Rating',
            key: 'rating',
            dataIndex: 'rating',
            render: data => (
                type === 'PLAY_LATER' ? <span className={'bold'}>9:30</span> : (
                        <Box width={30}>
                            <Star color={'white'} size={18}/>
                            <span>5</span>
                        </Box>
                    )
            )
        },
        {
            
            title: '',
            dataIndex: 'tableInfo',
            key: 'gameLink',
            render: (data) => (
                    <div className={styles.playNowButton}>
                        {
                            type !== 'PLAY_LATER' && (
                                <div>
                                    <img src={playNow} alt=""/>
                                    <span>Play Now</span>                              
                                </div>
                            )
                        }

                    </div>
                )
            
        },
    ]
}

const TableLobby = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.tableLobby.tables)

    useEffect(() => {
        fakeApi(props.type)
            .then(result => {
                dispatch({
                    type: 'UPDATE_TABLES_LIST',
                    payload: result.tables
                })
            });
    }, [props, dispatch])

    return (
        <div className={styles.tableLobbyContainer}>
            <Table
                columns={getColumns(props.type)}
                dataSource={state}
                pagination={false}
                rowClassName={(record, index) => index % 2 !== 0 && 'antd-row-highlighted'}
                onRow={(r) => ({
                    onClick: () => {
                        dispatch({
                            type: 'UPDATE_ACE_LIVE_INFO',
                            payload: r.id
                        })
                    },
                })}
                rowKey={(r) => r.id}
            />
        </div>
    )
}

TableLobby.defaultProps = {
    type: propTypes.string.isRequired
}

export default TableLobby
