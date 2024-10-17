import { BtnBackTo } from "../components/BtnBackTo";
import { useParams } from 'react-router-dom';
import { UseRemovePackage } from "../hooks/UseRemovePackage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Title } from "../components/Title";
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import cubo from '../assets/cubo-3d.png'

export const RemovePackage = () => {

    const { dropId, group, transport } = useParams();
    const { setRemovePackage } = UseRemovePackage();
    const [isLoading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const [doGrouping, setDoGrouping] = useState(true);

    //Notificaciones
    const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    //Ventana emergente con boton aceptar
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmit = async (data) => {
        try {
            if (doGrouping) {
                setDoGrouping(false);
                setLoading(true);
                const result = await setRemovePackage(data);
                console.log(result);

                if (result.isSuccess) {
                    setLoading(false);
                    setAlert({ open: true, severity: 'success', message: result.message, title: 'Bulto eliminado' });
                    reset();
                }
                else {
                    setLoading(false);
                    setAlert({ open: true, severity: 'success', message: result.message, title: 'ERROR!' });
                    reset();
                }
                setDoGrouping(true);
            }
            else {
                console.log("se apreto mas de un enter");
            }
        } catch (error) {
            setDoGrouping(true);
            setLoading(false);
            console.error("Error en onSubmit:", error);
            reset();
        }
    }

    //STYLES
    const btnStyle = {
        color: 'white',
        fontWeight: '500',
        width: '75%',
        padding: '10px',
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
            {/* <div className="container d-flex mt-5 justify-content-center">
                <div className="row mt-3 col-md-6 flex-column text-center">
                    <b>Confirmar el bulto a remover:</b>
                    <button className='btn btn-secondary' disabled><b>#{dropId}</b></button>
                    <label className='mt-4'>Escanee el bulto a remover</label>
                    <input placeholder='QR' type='password' />
                    <button className='btn btn-danger mt-4 p-2'>Remover caja</button>
                    <div className='d-flex justify-content-center'>
                        <BtnBackTo redirect={`/Grouper/PalletDetail/${dropId}`}></BtnBackTo>
                    </div>
                </div>
            </div> */}
            {isLoading && (
                <div style={loadingOverlayStyles}>
                    <CircularProgress />
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-5">
                    <div className="row mt-3 flex-column align-items-center">
                        <div className='col-md-6 mb-3'>
                            <Title title="Remover Caja" />
                        </div>
                        <div className="d-flex justify-content-center col-md-6 mb-3">
                            <img src={cubo} />
                        </div>
                        <div className='d-flex flex-column mt-4 col-md-6 mb-3'>
                            <b><label>Escanee el QR:</label></b>
                            <input autoFocus className="input-group-text" type='text' id="QR" placeholder='' autoComplete='off' {...register('QR', { required: true })} />
                            {errors.QR?.type === 'required' && <span className='error'>El campo QR es requerido</span>}
                        </div>
                        <button className='btn btn-danger' style={btnStyle}>Remover Caja</button>
                        <BtnBackTo redirect={`/Grouper/PalletDetail/${dropId}/${group}/${transport}`}></BtnBackTo>
                    </div>
                </div>
            </form>
            {/* Renderizar la alerta como un modal */}
            <Dialog open={alert.open} onClose={handleAlertClose}>
                <DialogTitle sx={{ fontSize: '2rem' }}>{alert.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ whiteSpace: 'pre-line', fontSize: '25px' }}>
                        {alert.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar se utiliza para renderizar las notificaciones */}
            <Snackbar open={notification.open} autoHideDuration={5000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
                <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px', fontWeight: '500' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}
