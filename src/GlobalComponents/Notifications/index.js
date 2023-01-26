import React, {useState, useEffect} from "react";
import {Modal, Badge} from "antd";
import NotificationsItem from "./NotificationsItem";
import {Bell, X} from "react-feather";
import variables from "../../variables";
import styles from './styles.module.sass'
import {useMediaQuery} from "react-responsive";

const Notification = () => {
    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(false)
    const isExtraSmallPhone = useMediaQuery({ query: '(max-width: 360px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' })
    const isPhone = useMediaQuery({ query: '(max-width: 414px)' })
    
    const modalWidth = isDesktop ? 985 : isPhone  ? '95%' : '90%'
    const modalHeight = isDesktop ? '615px' : isPhone ? '414px' : '690px'
    
    useEffect(() => {
        // fetch data from the server and update the data
        setData([
            {
                id: 'x',
                title: 'NOTIFICATION TITLE 1',
                content: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            },
            {
                id: 'x1',
                title: 'NOTIFICATION TITLE 1',
                content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            },
            {
                id: 'x2',
                title: 'NOTIFICATION TITLE 1',
                content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            },
            {
                id: 'x3',
                title: 'NOTIFICATION TITLE 1',
                content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            },
            {
                id: 'x41',
                title: 'NOTIFICATION TITLE 1',
                content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            },
            {
                id: 'x232',
                title: 'NOTIFICATION TITLE 1',
                content: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
            }
        ])
    }, [])


    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <>
            <Modal
                centered
                closable={false}
                visible={visible}
                onCancel={() => setVisible(false)}
                width={modalWidth}
                footer={null}
                bodyStyle={{
                    backgroundColor: variables.colors.bgDark,
                    padding: 0,
                    borderRadius: '30px',
                    boxShadow: '8px 8px 10px 10px rgba(0, 0, 0, 0.25)',
                    height: modalHeight
                }}

            >
                <header className={styles.header}>
                    <h1>NOTIFICATIONS</h1>
                    <X color={variables.colors.base} size={30} onClick={() => setVisible(false)} />
                </header>
                <div className={styles.notificationContainer}>
                    {data?.length === 0 && (
                        <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span style={{fontSize: '18px'}} className={'text-light'}>You don’t have any Notification
                                at the moment</span>    
                        </div>
                    )}
                    {
                        data?.map((item, key) => <NotificationsItem title={item.title} key={key} content={item.content} onRemove={() => {
                            setData(data.filter(x => x.id !== item.id))
                        }
                        }/>)
                    }
                </div>
            </Modal>
            <Badge count={data?.length} size={isExtraSmallPhone ? 'small'  : 'default'} onClick={handleClick} className={styles.badge}>
                <Bell color={"white"}/>
            </Badge>
        </>
    );
};

export default Notification;