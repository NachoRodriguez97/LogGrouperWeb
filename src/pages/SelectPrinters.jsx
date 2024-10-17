import { Title } from "../components/Title";
import React, { useEffect } from 'react';
import '../styles/printers.css';
import { UseFetch } from "../hooks/UseFetch";
import { UseSetPrinters } from "../hooks/UseSetPrinters";
import { useState } from "react";
import { useApiContext } from '../hooks/UseApiContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

export const SelectPrinters = () => {

    const { apiUrls } = useApiContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'GetPrinters', dataBody: localStorage.getItem("token") });
    const { setPrinters } = UseSetPrinters();

    const [selectedLabel, setSelectedLabel] = useState({ printer_name: '', printer_type: '' });
    const [selectedList, setSelectedList] = useState({ printer_name: '', printer_type: '' });

    //Notificaciones
    const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const handleSetImpresoraClick = async () => {
        try {
            setLoading(true);

            if(!selectedLabel.Name || !selectedList.Name){
                setLoading(false);
                setNotification({ open: true, severity: 'error', message: 'Debe seleccionar ambas impresoras.' });
                return;
            }

            let printerList = [selectedLabel, selectedList]
            const result = await setPrinters(printerList);

            if (result.isSuccess) {
                localStorage.setItem("token", result.token)
                setLoading(false);
                navigate('/Grouper/MainMenu');
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

    useEffect(() => {
        // Verificar si selectedLabel.Name y selectedList.Name son undefined
        const labelText = (selectedLabel.Name || selectedList.Name)
            ? `Etiqueta: ${selectedLabel.Name} | Listado: ${selectedList.Name}`
            : `Etiqueta: Sin impresora | Listado: Sin impresora`;

        // Actualizar el texto del div después de que se seleccionan las impresoras
        document.getElementById('printerInfo').innerText = labelText;
    }, [selectedLabel, selectedList]);

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
                        <Title title="CONFIGURAR IMPRESORA"></Title>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="etiqueta" className="form-label">Etiqueta:</label>
                        <select
                            className="form-select"
                            defaultValue="default"
                            id='etiqueta'
                            onChange={(e) => setSelectedLabel({ Name: e.target.value, Type: e.target.options[e.target.selectedIndex]?.getAttribute("data-type") })}
                        >
                            <option key="default" value="default" disabled>Selecciona...</option>
                            {data.message && JSON.parse(data.message).map(impresora => (
                                impresora.Type === "PRINTLBL" && (
                                    <option key={`label_${impresora.id}`} value={impresora.Name} data-type={impresora.Type}>
                                        {impresora.Name}
                                    </option>
                                )))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="listado" className="form-label">Packing:</label>
                        <select
                            className="form-select"
                            defaultValue="default"
                            id='etiqueta'
                            onChange={(e) => setSelectedList({ Name: e.target.value, Type: e.target.options[e.target.selectedIndex]?.getAttribute("data-type") })}
                        >
                            <option key="default" value="default" disabled>Selecciona...</option>
                            {data.message && JSON.parse(data.message).map(impresora => (
                                impresora.Type === "PRINTPACK" && (
                                    <option key={`list_${impresora.id}`} value={impresora.Name} data-type={impresora.Type}>
                                        {impresora.Name}
                                    </option>
                                )))}
                        </select>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-danger" id="setPrinter" onClick={handleSetImpresoraClick}>ACEPTAR</button>
                </div>
            </div>
            {/* Snackbar se utiliza para renderizar las notificaciones */}
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
}
