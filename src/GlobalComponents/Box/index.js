const Box = (props) => {
    const {children, width} = props 
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 'auto',
            width: width
            
        }} >
            {children}
        </div>
    )
}

export default Box;