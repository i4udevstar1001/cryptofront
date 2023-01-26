import {Layout, Button, Avatar} from 'antd'
import styles from './styles.module.sass'
import { useMediaQuery } from 'react-responsive'
import logo from '../../Assets/Images/logo_main_horizontal.png'
import {Link} from 'react-router-dom'
import Notification from '../../GlobalComponents/Notifications'
const {Header} = Layout

const HeaderComponent = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })
    const isBiggerthanIpad = useMediaQuery({ query: '(min-width: 769px)' })

    const walletConnected = true 
    return (
        <Header className={styles.header}>
            
            <Link to={'/'}>
                <img src={logo} alt={'logo'}/>
            </Link>
            <div className={styles.right}>
                <Notification/>
                {isTabletOrMobile && <Avatar className={styles.avatar}
                    // src={'http://lorempixel.com/100/100/'}
                />}
                {walletConnected && isBiggerthanIpad && <Button type={'primary'}>Connect Wallet</Button>}
            </div>
        </Header>
    )
}

export default HeaderComponent;