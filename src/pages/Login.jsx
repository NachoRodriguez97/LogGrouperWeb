import React, { useState, useEffect } from "react";
import { UseLogin } from '../hooks/UseLogin';
import '../styles/login.css';
import logo from '../assets/loginter.png';
import { useForm } from "react-hook-form";
import { UseFetch } from "../hooks/UseFetch";
import { useApiContext } from '../hooks/UseApiContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

    const { apiUrls } = useApiContext();
    const { data } = UseFetch({ url: apiUrls.loginApi + 'GetClients', dataBody: {} });
    const [isLoading, setLoading] = useState(false);
    const { load, setLogin } = UseLogin();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    //Notificaciones
    const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const onSubmit = async (userInfo) => {
        try {
            setLoading(true);
            localStorage.setItem('userInfo', `{ "username": "${userInfo.Username}", "client": "${userInfo.Client}" }`)
            const loginResult = await setLogin(userInfo);
            console.log("login result", loginResult);

            if (!loginResult.isSuccess) {
                setNotification({ open: true, severity: 'error', message: loginResult.message });
                console.log("data", loginResult);
                reset();
            }
            else {
                navigate('/Grouper/SelectPrinters');
            }

            setLoading(false);
        } catch (error) {
            console.error("Error en onSubmit:", error);
            setLoading(false);
        }
    }

    const loadingOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', // 100% del ancho de la ventana
        height: '100vh', // 100% de la altura de la ventana
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
    };

    return (
        <>
            {isLoading && (
                <div style={loadingOverlayStyles}>
                    <CircularProgress />
                </div>
            )}            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='login-container'>
                    <div className="login-card">
                        <img src={logo} alt="Logo" className='logo'></img>
                        <div className="customers">
                            <label>Clientes</label>
                            <select
                                className="form-select customers"
                                defaultValue="default"
                                onChange={(e) => SetSelectCustomers(e.target.value)}
                                {...register('Client', { required: true })}
                            >
                                <option value="default" disabled>Selecciona...</option>
                                {data.message && JSON.parse(data.message).map(client => (
                                    <option key={client.Id} value={client.Name}>
                                        {client.Name}
                                    </option>
                                ))}
                            </select>
                            {errors.client?.type === 'required' && <span className="error">El campo Cliente es requerido</span>}
                        </div>
                        <div className="user">
                            <label>Usuario</label>
                            <input type="text" {...register('Username', { required: true })} />
                            {errors.User?.type === 'required' && <span className='error'>El campo usuario es requerido</span>}
                        </div>
                        <div className="pass">
                            <label>Contraseña</label>
                            <input type="password" {...register('Password', { required: true })} />
                            {errors.Pass?.type === 'required' && <span className='error'>El campo contraseña es requerido</span>}
                        </div>
                        <input className='btn btn-primary' type='submit' value="Ingresar" />
                    </div>
                </div>
            </form>
            {/* Snackbar se utiliza para renderizar las notificaciones */}
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;