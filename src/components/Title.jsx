export const Title = ({ title }) => {

    const titleStyle = {
        borderRadius: '5px',
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        background: '#f67777',
        padding: '15px',
        fontSize: '20px'
    }

    return (
        <h1 className="text-center" style={titleStyle}>
            {title}
        </h1>
    )
}