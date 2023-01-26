import { Layout } from 'antd'
// import {Home, Star, Pocket, Heart} from "react-feather"
import {Home, Pocket, Heart} from "react-feather"
// import {Link, useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import walletIcon from '../../Assets/Images/wallet.svg'
import './Footer.sass'

const {Footer} = Layout 

const FooterComponent = () => {
    // const location = useLocation()
    return (
        <Footer className={'footer'}>
                <Link to={'/'}>
                    <Home color={'white'}/>
                </Link>
            
                <Link to='/Wallet'>
                    <img src={walletIcon} style={{marginBottom: '6px'}} alt="" />
                </Link> 
       
                <Link to={'/game'}>
                    <Pocket color={'white'}/>
                </Link>
          
                <Link to={'2'}>
                    <Heart color={'white'}/>
                </Link>
           
        </Footer>
    )
}

export default FooterComponent;