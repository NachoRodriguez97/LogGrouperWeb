import cubo from '../assets/cubo-3d.png'
import { BtnBackTo } from "../components/BtnBackTo";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import { useApiContext } from '../hooks/UseApiContext';
import { UsePrint } from "../hooks/UsePrint";

export const PrintLabel = () => {

    const { dropId, group, transport } = useParams();
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

    const handleButtonClick = async (dropId) => {
        try {
            setLoading(true);
            const result = await setPrint(dropId, 'PrintLabel', group, transport);

            if (result.isSuccess) {
                setLoading(false);
                setNotification({ open: true, severity: 'success', message: result.message });
            }
            else {
                setLoading(false);
                //setNotification({ open: true, severity: 'error', message: result.message });
                setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
            }
        }
        catch (error) {
            setLoading(false);
            console.error("Error en onSubmit:", error);
        }

    };

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
            <div className="container d-flex mt-5 justify-content-center">
                <div className="row mt-3 flex-column ">
                    <div className="d-flex justify-content-center col-md-6 mb-3">
                        <img src={cubo} />
                    </div>
                    <div className='col-md-6'>
                        Confirmar reimprecion de etiqueta
                    </div>
                    <div className="d-flex justify-content-center col-md-6 mb-3">
                        <b>#{dropId} - {group}</b>
                    </div>
                    <button className='btn btn-danger' onClick={() => handleButtonClick(dropId)}>Confirmar</button>
                    <div className='d-flex justify-content-center'>
                        <BtnBackTo redirect={`/Grouper/PalletDetail/${dropId}/${group}/${transport}`}></BtnBackTo>
                    </div>
                </div>
            </div>
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
