import React  from 'react'
import styles from './styles.module.sass'
import {Trash, ChevronDown, Circle} from "react-feather"
import {useMediaQuery} from 'react-responsive'
import variables from "../../../variables";
const ShowMoreText = (props) => {
    const [state, setState] = React.useState(false)
    const isDesktop = useMediaQuery({ query: `(min-width: ${variables.breakpoints.desktop})` })

    return (
        <>
            <p ref={(node) => {
                if (node) {
                    
                    if(state && isDesktop)
                        node.style.setProperty("margin-bottom", '59px', "important");
                    else
                        node.style.setProperty("margin-bottom", '26px', "important");
                }
            }}
               style={{height: state && 'unset'}}
            >
                {props.text}
            </p>
            {props.text.length > 216 && (
                <ChevronDown
                    size={35}
                    className={styles.chevron}
                    onClick={() => setState(!state)}
                />
            )}
        </>
    )
}

const NotificationItem = ({title, content, onRemove}) => {
    return (
        <div className={styles.container}>
            <div>
                <Circle color={'white'} className={styles.circle}/>
            </div>
            <div>
                <h2>{title}</h2>
                <div style={{
                    display: 'flex'
                }}>
                    <ShowMoreText
                        text={content}/>
                    <Trash className={styles.trash} size={30} onClick={onRemove}/>
                </div>
            </div>
        </div>
    )
}

export default NotificationItem;