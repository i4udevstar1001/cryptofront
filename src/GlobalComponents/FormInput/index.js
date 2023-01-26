import {useState, useRef, forwardRef} from 'react'
import styles from './styles.module.sass'
// import {User, Eye, EyeOff, Mail} from 'react-feather'
import {Eye, EyeOff} from 'react-feather'

const Input = forwardRef((props, ref) => {
    const [active, setActive] = useState(false)
    // const [error, setError] = useState(false)
    const [value, setValue] = useState(props.value)
    // const [showPassword, setShowPassword] = useState(false)
    const [type, setType] = useState(props.type)
    const firstRenderType = useRef(props.type)
    const togglePassword = () => setType(type === 'password'  ? 'text' : 'password')
    const toggleActive = () => setActive(!active)
    
    // let inputRight = useRef(null)
    
    return (
        <div className={`${styles.container} ${active && styles.active}`}>
            {props.icon && (
                <div className={styles.svgContainer}>
                    {props.icon}
                </div>    
            )}
            <div className={styles.inputContainer}>
                {props.error && <span>{props.error}</span>}
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    {...props}
                    onFocus={toggleActive}
                    onBlur={toggleActive}
                    type={type}
                />  
                <div className={styles.inputRightSide}>
                    {firstRenderType.current === 'password' && props.togglepassword && (
                        type === 'text' ?
                            <Eye onClick={togglePassword} size={20} color={'#9C9A9A'}/>
                            :
                            <EyeOff onClick={togglePassword} size={20} color={'#9C9A9A'}/>
                    )}
                </div>
            </div>
        </div>
    )
})


export default Input 
