import cubo from '../assets/cubo-3d.png'
import { BtnBackTo } from "../components/BtnBackTo";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import { UseClosePallet } from "../hooks/UseClosePallet";
import { UseFetch } from "../hooks/UseFetch";
import { useApiContext } from '../hooks/UseApiContext';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export const ClosePallet = () => {

  const { dropId, group, transport } = useParams();
  const [loading, setLoading] = useState(false);
  const { setClosePallet } = UseClosePallet();
  const { apiUrls } = useApiContext();
  const [diference, setDiference] = useState(null);
  const [isOk, setIsOk] = useState(true); //Si el cierre del pallet es falso muestro el boton para ver los pedidos con diferencia
  const navigate = useNavigate();

  const body = {
    pallet: {
      dropId: dropId
    },
    token: localStorage.getItem("token")
  }
  const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'PackageQty', dataBody: body });

  //Ventana emergente con boton aceptar
  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

  // const handleAlertClose = () => {
  //   setAlert({ ...alert, open: false });
  // };

  const handleAlertClose = () => {
    if (alert.open && alert.severity === 'success'){
      setAlert({ ...alert, open: false });
      navigate('/Grouper/MainMenu');
    }
    else{
      setAlert({ ...alert, open: false });
    }
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
    //navigate(`/Grouper/PalletDetail/${dropId}`);
    try {

      setLoading(true);

      if (data.result == 0) {
        setLoading(false);
        setAlert({ open: true, severity: 'error', message: "No se puede cerrar un pallet sin pedidos agrupados.", title: 'Error.' });
      }
      else {
        const result = await setClosePallet(dropId, group, transport);

        if (result.isSuccess) {
          setIsOk(true);
          setLoading(false);
          //setNotification({ open: true, severity: 'success', message: result.message });
          setAlert({ open: true, severity: 'success', message: result.message, title: 'Confirmación.' });
          //navigate('/Grouper/MainMenu');
        }
        else {
          console.log("diferencia", JSON.parse(result.result));
          setDiference(result.result);
          setIsOk(false);
          setLoading(false);
          //setNotification({ open: true, severity: 'error', message: result.message });
          setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
        }
      }
    }
    catch (error) {
      setLoading(false);
      console.error("Error en onSubmit:", error);
    }

  };

  // useEffect(() => {
  //   if (alert.open && alert.severity === 'success') {
  //     const timeout = setTimeout(() => {
  //       navigate('/Grouper/MainMenu');
  //     }, 2000); // Redirigir después de 2 segundos

  //     return () => clearTimeout(timeout);
  //   }
  // }, [alert.open, alert.severity]);

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
      {loading && (
        <div style={loadingOverlayStyles}>
          <CircularProgress />
        </div>
      )}
      <div className="container d-flex mt-5 justify-content-center">
        <div className="row mt-3 flex-column ">
          <div className="d-flex justify-content-center col-md-6 mb-3">
            <img src={cubo} />
          </div>
          <div className='col-md-6 mb-3'>
            Confirmar el cierre del Agrupado:
          </div>
          <div className="d-flex justify-content-center col-md-6 mb-3">
            <b>#{dropId}</b>
          </div>
          <div className="d-flex justify-content-center col-md-6 mb-3">
            <b>Grupo: {group}</b>
          </div>
          <div className="d-flex justify-content-center col-md-6 mb-3">
            <b>Cantidad de cajas: {data.result}</b>
          </div>
          {!isOk && (
            <Link className='btn btn-primary mb-3' to={`/Grouper/Diference/${dropId}/${group}/${transport}`}>Ver Diferencias</Link>
          )}
          <button className='btn btn-danger' onClick={() => handleButtonClick(dropId)}>Confirmar Cierre</button>
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
