import { BtnBackTo } from "../components/BtnBackTo";
import { UseFetch } from "../hooks/UseFetch";
import CircularProgress from '@mui/material/CircularProgress';
import { useApiContext } from '../hooks/UseApiContext';
import { Title } from "../components/Title";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import { UseFilteredPallets } from "../hooks/UseFilteredPallets";
import { useNavigate } from 'react-router-dom';

export const PalletsFilter = () => {

    const { apiUrls } = useApiContext();
    const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'GetFilters', dataBody: localStorage.getItem("token") });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selectedTransport, setselectedTransport] = useState({ Transport: '', Id: '' });
    const [selectedGroup, setselectedGroup] = useState({ Group: '' });

    const { setFilteredPallets } = UseFilteredPallets();

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

    const handleFiltrarPalletsClick = async () => {
        try {
            setLoading(true);

            if (!selectedTransport.Transport || !selectedGroup.Group) {
                setLoading(false);
                setNotification({ open: true, severity: 'error', message: 'Debe seleccionar el transporte y grupo' });
                return;
            }

            const newPallet = {
                TransportDescription: selectedTransport.Transport,
                Transport: selectedTransport.Id,
                Group: selectedGroup.Group
            }

            console.log('nuevo pallet',newPallet);

            const result = await setFilteredPallets(newPallet);

            if (result.isSuccess) {
                setLoading(false);
                navigate('/Grouper/GroupingEvent', {state: result.result})
            }
            else {
                setLoading(false);
                setNotification({ open: true, severity: 'error', message: result.message });
            }
        }
        catch (error) {
            setLoading(false);
            console.error(error);
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
            {loading && (
                <div style={loadingOverlayStyles}>
                    <CircularProgress />
                </div>
            )}
            <div className="container mt-5">
                <div className="row mt-3 selectPrinters">
                    <div className='col-md-6 mb-3'>
                        <Title title="FILTRAR PALLETS"></Title>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="transporte" className="form-label">Transporte:</label>
                        <select
                            className="form-select"
                            defaultValue="default"
                            id='transporte'
                            onChange={(e) => setselectedTransport({ Transport: e.target.value, Id: e.target.options[e.target.selectedIndex]?.getAttribute("data-type") })}
                        >
                            <option key="default" value="default" disabled>Selecciona...</option>
                            {data.result && JSON.parse(data.result).Description.map((description, index) => (
                                <option key={index} value={description} data-type={JSON.parse(data.result).Transports[index]}>
                                    {description}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="grupo" className="form-label">Grupo:</label>
                        <select
                            className="form-select"
                            defaultValue="default"
                            id='grupo'
                            onChange={(e) => setselectedGroup({ Group: e.target.value, Type: e.target.options[e.target.selectedIndex]?.getAttribute("data-type") })}
                        >
                            <option key="default" value="default" disabled>Selecciona...</option>
                            {data.result && JSON.parse(data.result).Groups.map((groups, index) => (
                                <option key={index} value={groups}>{groups}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-danger" id="setPrinter" onClick={handleFiltrarPalletsClick}>Filtrar Pallets</button>
                    <BtnBackTo redirect="/Grouper/MainMenu"></BtnBackTo>
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
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
}
