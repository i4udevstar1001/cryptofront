import {useMemo, useState, useEffect} from 'react'
import {Table, Button} from 'antd'
import {useSelector} from 'react-redux'
import {PlusCircle} from 'react-feather'
import styles from './styles.module.sass'

const AceLive = () => {
    const [state, setState] = useState(null)
    const {aceLiveActive, tables} = useSelector(state => state.tableLobby)
    const [tableName, setTableName] = useState(null)

    useEffect(() => {
        let tableData
        if (tables.length) {
            if (aceLiveActive === null)
                tableData = tables[0]
            else
                tableData = tables.filter(item => item.id === aceLiveActive)[0]
            setTableName(tableData.id)
            setState(tableData.names.map((item, index) => {
                return {
                    name: item,
                    stake: tableData.stakes[index],
                    key: index
                }
            }))
        }

    }, [aceLiveActive, tables])


    const columns = useMemo(
        () => [
            {
                title: 'Name',
                dataIndex: 'name',
                key: "name"
            },
            {
                title: 'Stake',
                dataIndex: 'stake',
                key: 'stake'
            },
        ],
        []
    )

    return (
        <div className={styles.aceLiveContainer}>
            <h1>ACE LIVE ${tableName}</h1>
            <p>Player’s Info</p>
            <Table dataSource={state}
                   columns={columns}
                   pagination={false}
                   rowClassName={(record, index) => index % 2 === 0 && styles.highlight}
            />
            <Button>
                <PlusCircle style={{paddingRight: '8px'}} size={30}/>
                 JOIN TABLE
            </Button>
        </div>
    )
}

export default AceLive;