import React from 'react'

export const BtnLogout = () => {

    const navigate = useNavigate();
    const handleLogoutClick = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <button className="btn btn-light" id="cerrarSesion" onClick={handleLogoutClick}>
                <img src={logoutImg} />
                <span>Cerrar Sesión</span>
            </button>
        </>
    )
}
