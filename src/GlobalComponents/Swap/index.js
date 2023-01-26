import {useState, useEffect} from 'react'
import {Button, Radio} from 'antd'
import styles from './stlyes.module.sass'
import Input from '../Input'
import svg_usdc from '../../Assets/Images/usd-coin-usdc-logo.svg'
import png_ace from '../../Assets/Images/icon-tiny.png'
import svg_swap from '../../Assets/Images/swap.svg'
import png_arrowDown from '../../Assets/Images/arrow-down-circle.png'

const walletHolding = 1000

const Swap = () => {
    const [usdc, setUsdc] = useState(100)
    const [ace, setAce] = useState(0)
    // const [convertRate, setConvertRate] = useState(0.5)
    const convertRate = 0.5
    const [balance, setBalace] = useState(0)
    useEffect(() => {
        setAce(usdc * convertRate)
        setBalace(walletHolding - usdc)
    }, [usdc])
    const radioButtonHandler = (e) => {
        const value = e.target.value
        switch (value) {
            case 'a':
                setUsdc(walletHolding * 0.25)
                break
            case 'b':
                setUsdc(walletHolding * 0.5)
                break
            case 'c':
                setUsdc(walletHolding * 0.75)
                break
            case 'd':
                setUsdc(walletHolding * 1)
                break;
            default:
                break;
        }

    }
    const maxHandler = () => {
        setUsdc(walletHolding)
        console.log(ace)
    }
    const handleUsdcChange = e => {
        setUsdc(e.target.value.replace(/\D/, ''))
    }
    const handleAceChange = e => setAce(e.target.value)
        
    const validCharacterChecker = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }
    return (
        <div className={styles.swapToken}>
            <div className={styles.topLabels}>
                <label htmlFor="From">from</label>
                <span className={'mobile-hide'}>Balance: {balance}</span>
            </div>
            <div className={styles.inputContainer}>
                <Input id={'From'} type={'number'} value={usdc} onKeyPress={validCharacterChecker}
                       onChange={handleUsdcChange}/>
                <div className={styles.containerEnd}>
                    <span>USDC</span>
                    <img src={svg_usdc} alt=""/>
                    <Button size={'small'} type={'primary'} onClick={maxHandler}>MAX</Button>
                </div>
            </div>
            <img src={png_arrowDown} className={styles.arrowDown} alt=""/>
            <div className={styles.topLabels}>
                <label htmlFor="To">to</label>
            </div>
            <div className={styles.inputContainer}>
                <Input id={'From'} type={'number'} value={usdc} onKeyPress={validCharacterChecker}
                       onChange={handleAceChange}/>
                <div className={styles.containerEnd}>
                    <span>ACE</span>
                    <img src={png_ace} alt=""/>
                </div>
            </div>
            <Radio.Group defaultValue="a" buttonStyle="solid" onChange={radioButtonHandler}
                         className={styles.radioGroup}>
                <Radio.Button value="a">25%</Radio.Button>
                <Radio.Button value="b">50%</Radio.Button>
                <Radio.Button value="c">75%</Radio.Button>
                <Radio.Button value="d">100%</Radio.Button>
            </Radio.Group>
            <div className={styles.buttonContainer}>
                <Button type={'primary'} className={styles.button}>
                    <img src={svg_swap} alt=""/>
                </Button>
            </div>
        </div>
    )
}

export default Swap;