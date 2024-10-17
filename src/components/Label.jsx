export const Label = ({ label }) => {

    const labelStyle = {
        color: '#58595C',
        fontWeight: '500'
    }

    return (
        <div style={labelStyle}>
            {label}
        </div>
    )
}