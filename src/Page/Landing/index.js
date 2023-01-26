import { useEffect } from "react";
import styles from "./styles.module.sass";
import {Button} from 'antd';
import logo from "../../Assets/Images/logo_main_horizontal.png";
import LandingImg from "../../Assets/Images/landing-header.jpg";
import WelcomeImg from "../../Assets/Images/welcome-img.png";
import RegisterImg from "../../Assets/Images/register-img.jpg";
import GameImg from "../../Assets/Images/game-img.png";
import {Link, useHistory} from 'react-router-dom';
import AuthService from "../../Services/auth.service";

const Landing = () => {
  const history = useHistory()
  useEffect(() => {
    if( AuthService.getCurrentUser() != null ) {
      history.push('/')
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <header>
        <Link to={'/'}>
          <img src={logo} alt="CryptoAces" className={styles.logo} />
        </Link>
      </header>

      <section className={styles.banner}>
        <img src={LandingImg} alt="" />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>A place made</h1>
          <h1 className={styles.title}>for the <span>Billionaires</span></h1>
          <p className={styles.mt20}>A man with money is no match against a man on mission.</p>
          <h5>Be so good, they can't ignore you.</h5>
          <p>Life is too long to play a bad card.</p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutText}>
          <h2>About CryptoAces</h2>
          <p>CryptoAces is an all-new, fully decentralized poker platform designed<br /> 
            on blockchain. It aims to improve in-game experience by leveraging<br />
            technology to bring alive the thrills of winning in poker,<br />
            in a fully secure manner.</p>
          <Link to={'/login'}>
            <Button type={'primary'} className={styles.button}>
                Learn more
            </Button>
          </Link>
        </div>
        <img src={WelcomeImg} alt="" className={styles.welcomeImg}/>
      </section>

      <section className={styles.ourgame}>
        <div className={styles.gameImg}>
          <img src={GameImg} alt="" />
        </div>
        <div className={styles.gameText}>
          <h5>HAVE YOU CONSIDERED</h5>
          <h2>OUR GAMING</h2>
          <h4>ENVIRONMENT?</h4>
          <p>Here in CryptoAces we have the best team who works 24hours 
            to ensure you have the best experience while playing our poker 
            game. Our gaming environment, comprise of all features 
            available in the real-life poker game. This features, is to enable 
            you play with the physical skills you have and to give you a 
            real-life experience  while playing any poker game.</p>
        </div>
      </section>

      <section className={styles.register}>
        <img src={RegisterImg} alt="" />
        <div className={styles.registerContent}>
          <h2>You're One Step Away</h2>
          <p>Click on the button below to register</p>
          <Link to={'/register'}>
            <Button type={'primary'} className={styles.button}>
                REGISTER
            </Button>
          </Link>
        </div>
      </section>
      <section className={styles.reserved}>
        <p>2021  All Right Reserved  &nbsp;<span>Cryptoaces.com</span></p>
      </section>
    </div>
  );
};

export default  Landing;