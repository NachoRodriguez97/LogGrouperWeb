import { BtnBackTo } from "../components/BtnBackTo";
import { Title } from "../components/Title";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import { UsePrint } from "../hooks/UsePrint";

export const ReprintPacking = () => {

    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const [isLoading, setLoading] = useState(false);
    const { setPrint } = UsePrint();

    //Ventana emergente con boton aceptar
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    //Notificaciones
    const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const onSubmit = async (data) => {
        try {

            setLoading(true);
            const result = await setPrint(data.DropId, 'PrintPacking');

            if (result.isSuccess) {
                setLoading(false);
                setNotification({ open: true, severity: 'success', message: result.message });
            }
            else {
                setLoading(false);
                setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
            }
            reset();

        } catch (error) {
            setLoading(false);
            console.error("Error en onSubmit:", error);
            reset();
        }
    }

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
            {isLoading && (
                <div style={loadingOverlayStyles}>
                    <CircularProgress />
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mt-5">
                    <div className="row mt-3 flex-column align-items-center">
                        <div className='col-md-6 mb-3'>
                            <Title title="REIMPRIMIR PACKING" />
                        </div>
                        <div className='d-flex flex-column mt-4 col-md-6 mb-3'>
                            <b><label>ID DE PALLET:</label></b>
                            <input className="input-group-text" type='text' id="DropId" autoFocus autoComplete='off' {...register('DropId', { required: true })} />
                            {errors.DropId?.type === 'required' && <span className='error'>El campo pallet es requerido</span>}
                        </div>
                        <button className='btn btn-danger' style={btnStyle}>Confirmar</button>
                        <BtnBackTo redirect="/Grouper/Reprint"></BtnBackTo>
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
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
                <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px', fontWeight: '500' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}
