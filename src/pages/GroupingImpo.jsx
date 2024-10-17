// import { Title } from "../components/Title";
// import { BtnBackTo } from "../components/BtnBackTo";
// import cubo from '../assets/cubo-3d.png'
// import { UseGrouping } from "../hooks/UseGrouping";
// import { useForm } from "react-hook-form";
// import React, { useState, useEffect } from "react";
// import CircularProgress from '@mui/material/CircularProgress';
// import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';

// export const GroupingImpo = () => {
//     const { setGrouping } = UseGrouping();
//     const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
//     const [isLoading, setLoading] = useState(false);
//     const [groupingResult, setGroupingResult] = useState(null);
//     const [activeForm, setActiveForm] = useState(1);
//     const [palletInfo, setPalletInfo] = useState(null);
//     const [doGrouping, setDoGrouping] = useState(true);
//     const [settingsItems, setSettings] = useState([]);

//     useEffect(() => {
//         // Obtener settings desde localStorage
//         const storedSettings = localStorage.getItem('Settings');
//         const parsedSettings = storedSettings ? JSON.parse(storedSettings) : [];
//         var filteredSettings = parsedSettings.filter(item => item.Module === 'Grouping');

//         setSettings(filteredSettings);
//     }, []);

//     //Notificaciones
//     const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
//     const handleNotificationClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setNotification({ ...notification, open: false });
//     };

//     //Ventana emergente con boton aceptar
//     const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

//     const handleAlertClose = () => {
//         setAlert({ ...alert, open: false });
//     };

//     const onSubmit = async (data) => {
//         try {
//             if (doGrouping) {
//                 setDoGrouping(false);
//                 setLoading(true);

//                 const result = await setGrouping(data, 'CreatePallet', {});

//                 if (result.isSuccess) {
//                     setLoading(false);
//                     setGroupingResult(JSON.parse(result.result));

//                     if (JSON.parse(result.result).NewDropId) {
//                         setAlert({ open: true, severity: 'success', message: 'Nuevo pallet: ' + result.message, title: 'No existe pallet en curso para el transporte.' });
//                         setPalletInfo(JSON.parse(result.result));
//                         setActiveForm(2);
//                         reset();
//                     }
//                     if (JSON.parse(result.result).DropId) {
//                         setPalletInfo(JSON.parse(result.result));
//                         setActiveForm(2);
//                         reset();
//                     }
//                 }
//                 else {
//                     setLoading(false);
//                     // setNotification({ open: true, severity: 'error', message: result.message });
//                     setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
//                     reset();
//                 }
//                 setDoGrouping(true);
//             }
//             else {
//                 console.log("se apreto mas de un enter");
//             }
//         } catch (error) {
//             setDoGrouping(true);
//             setLoading(false);
//             console.error("Error en onSubmit:", error);
//             reset();
//         }
//     }

//     const onSubmitConfirmPackage = async (data) => {
//         try {
//             if (doGrouping) {
//                 setDoGrouping(false);
//                 setLoading(true);
//                 const result = await setGrouping(data, 'CreatePalletDetail', palletInfo);
//                 console.log(result);

//                 if (result.isSuccess) {
//                     setLoading(false);
//                     setGroupingResult(JSON.parse(result.result));
//                     setNotification({ open: true, severity: 'success', message: 'Bulto agrupado correctamente' });
//                     setPalletInfo(JSON.parse(result.result));
//                     setActiveForm(2);
//                     reset();
//                     setGroupingResult(null);
//                 }
//                 else {
//                     console.log("error");
//                     setLoading(false);
//                     setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
//                     //setNotification({ open: true, severity: 'error', message: result.message });
//                     setActiveForm(2);
//                     reset();
//                     // setGroupingResult(null);
//                 }
//                 setDoGrouping(true);
//             }
//             else {
//                 console.log("se apreto mas de un enter");
//             }

//         } catch (error) {
//             setDoGrouping(true);
//             setLoading(false);
//             console.error("Error en onSubmit:", error);
//         }
//     }

//     const BackToGetPallet = () => {
//         try {
//             setActiveForm(1);
//             setGroupingResult(null);
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }

//     //STYLES
//     const btnStyle = {
//         color: 'white',
//         fontWeight: '500',
//         width: '75%',
//         padding: '10px',
//         display: 'none'
//     }
//     const btnBackToPalletStyle = {
//         color: 'white',
//         fontWeight: '500',
//         width: '75%',
//         padding: '10px',
//     }
//     const suggestedPalletStyle = {
//         backgroundColor: 'rgb(1 133 37 / 60%)',
//         color: 'white',
//         fontWeight: '500',
//         fontSize: '20px'
//     }
//     const orderLogStyle = {
//         backgroundColor: 'rgb(246, 119, 119)',
//         color: 'white',
//         fontWeight: '500'
//     }
//     const loadingOverlayStyles = {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw', // 100% del ancho de la ventana
//         height: '100vh', // 100% de la altura de la ventana
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         zIndex: 9999,
//     };

//     return (
//         <>
//             {isLoading && (
//                 <div style={loadingOverlayStyles}>
//                     <CircularProgress />
//                 </div>
//             )}
//             {activeForm === 1 && (
//                 //<form onSubmit={handleSubmit(onSubmit)}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="container mt-5">
//                         <div className="row mt-3 flex-column align-items-center">
//                             <div className='col-md-6 mb-3'>
//                                 <Title title="AGRUPADO" />
//                             </div>
//                             <div className="d-flex justify-content-center col-md-6 mb-3">
//                                 <img src={cubo} />
//                             </div>
//                             <div className='d-flex flex-column mt-4 col-md-6 mb-3'>
//                                 {settingsItems.map((settings, index) => (
//                                     <b><label>{settings.Name} </label></b>
//                                 ))}
//                                 <input className="input-group-text" type='text' id="QR" autoFocus autoComplete='off' {...register('QR', { required: true })} />
//                                 {errors.QR?.type === 'required' && <span className='error'>El campo es requerido</span>}
//                             </div>
//                             <div className="col-md-6 mb-3">
//                                 {groupingResult && (
//                                     <div className='d-flex flex-column'>

//                                         <b>Order: {groupingResult.OrderId}</b>
//                                         <b>Package: {groupingResult.Package}</b>
//                                         <span>Barcode: {groupingResult.Barcode}</span>
//                                         <span>Destiny: {groupingResult.Transport}</span>
//                                         {/* <div style={suggestedPalletStyle} className='mt-2 p-2'>
//                                             Pallet: <span>{groupingResult.DropId ? groupingResult.DropId : groupingResult.NewDropId}</span>
//                                         </div> */}

//                                     </div>
//                                 )}
//                             </div>
//                             <button className='btn btn-danger' style={btnStyle}>Confirmar</button>
//                             <BtnBackTo redirect="/Grouper/MainMenu"></BtnBackTo>
//                         </div>
//                     </div>
//                 </form>
//             )}
//             {activeForm === 2 && (
//                 <form onSubmit={handleSubmit(onSubmitConfirmPackage)}>
//                     <div className="container mt-5">
//                         <div className="row mt-3 flex-column align-items-center">
//                             <div className='col-md-6 mb-3'>
//                                 <Title title="CONFIRMAR AGRUPADO" />
//                             </div>
//                             <div className="d-flex justify-content-center col-md-6 mb-3">
//                                 <img src={cubo} />
//                             </div>
//                             <div class="col text-center col-md-6 mb-3">
//                                 <div style={suggestedPalletStyle} className='mt-2 p-2'>
//                                     Pallet: <span>{groupingResult.DropId ? groupingResult.DropId : groupingResult.NewDropId}</span>
//                                 </div>
//                             </div>
//                             <div className='d-flex flex-column mt-4 col-md-6 mb-3'>
//                                 <b><label>Escanee pallet para confirmar:</label></b>
//                                 <input className="input-group-text" type='text' id="QR" autoFocus autoComplete='off' {...register('QR', { required: true })} />
//                                 {errors.QR?.type === 'required' && <span className='error'>El campo es requerido</span>}
//                             </div>
//                             <div className="col-md-6 mb-3">
//                                 {groupingResult && (
//                                     <div className='d-flex flex-column'>

//                                         <b>Order: {groupingResult.OrderId}</b>
//                                         <b>City: {groupingResult.DropId_PickDetail}</b>
//                                         <span>Destiny: {groupingResult.Type}</span>
//                                         <span>Barcode: {groupingResult.Transport}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             <button type="submit" className="btn btn-danger mb-3" style={btnStyle}>Confirmar</button>
//                             <button className="btn btn-primary" onClick={BackToGetPallet} style={btnBackToPalletStyle}>Volver a obtener pallet</button>
//                         </div>
//                     </div>
//                 </form>
//             )}
//             {/* Renderizar la alerta como un modal */}
//             <Dialog open={alert.open} onClose={handleAlertClose}>
//                 <DialogTitle sx={{ fontSize: '2rem' }}>{alert.title}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText sx={{ whiteSpace: 'pre-line', fontSize: '25px' }}>
//                         {alert.message}
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleAlertClose} color="primary">
//                         Aceptar
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             {/* Snackbar se utiliza para renderizar las notificaciones */}
//             <Snackbar open={notification.open} autoHideDuration={5000} onClose={handleNotificationClose} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
//                 <Alert variant='filled' onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%', padding: '10px', fontSize: '15px', fontWeight: '500' }}>
//                     {notification.message}
//                 </Alert>
//             </Snackbar>
//         </>
//     )
// }

import { Title } from "../components/Title";
import { BtnBackTo } from "../components/BtnBackTo";
import cubo from '../assets/cubo-3d.png';
import { UseGrouping } from "../hooks/UseGrouping";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';

export const GroupingImpo = () => {
    const { setGrouping } = UseGrouping();
    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const [isLoading, setLoading] = useState(false);
    const [groupingResult, setGroupingResult] = useState(null);
    const [activeForm, setActiveForm] = useState(1);
    const [palletInfo, setPalletInfo] = useState(null);
    const [doGrouping, setDoGrouping] = useState(true);
    const [settingsItems, setSettings] = useState([]);
    const groupingResultRef = useRef(null); // Usamos ref para mantener los datos entre renders
    const [packageCounter, setPackageCounter] = useState(0);

    useEffect(() => {
        // Obtener settings desde localStorage
        const storedSettings = localStorage.getItem('Settings');
        const parsedSettings = storedSettings ? JSON.parse(storedSettings) : [];
        var filteredSettings = parsedSettings.filter(item => item.Module === 'Grouping');

        setSettings(filteredSettings);
    }, []);

    // Notificaciones
    const [notification, setNotification] = useState({ open: false, severity: 'success', message: '', title: '' });
    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    // Ventana emergente con boton aceptar
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmit = async (data) => {
        try {
            if (doGrouping) {
                setDoGrouping(false);
                setLoading(true);

                const result = await setGrouping(data, 'CreatePallet', {});

                if (result.isSuccess) {
                    setLoading(false);
                    const parsedResult = JSON.parse(result.result);
                    setGroupingResult(parsedResult);
                    groupingResultRef.current = parsedResult; // Guardamos en la referencia

                    if (parsedResult.NewDropId) {
                        setAlert({ open: true, severity: 'success', message: 'Nuevo pallet: ' + result.message, title: 'No existe pallet en curso para el transporte.' });
                        setPalletInfo(parsedResult);
                        setActiveForm(2);
                        reset();
                        setPackageCounter(0);
                    }
                    if (parsedResult.DropId) {
                        setPalletInfo(parsedResult);
                        setActiveForm(2);
                        reset();
                        setPackageCounter(0);
                    }
                } else {
                    setLoading(false);
                    setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
                    reset();
                }
                setDoGrouping(true);
            } else {
                console.log("se apreto mas de un enter");
            }
        } catch (error) {
            setDoGrouping(true);
            setLoading(false);
            console.error("Error en onSubmit:", error);
            reset();
        }
    };

    const onSubmitConfirmPackage = async (data) => {
        try {
            if (doGrouping) {
                setDoGrouping(false);
                setLoading(true);
                const result = await setGrouping(data, 'CreatePalletDetail', palletInfo);

                if (result.isSuccess) {
                    setLoading(false);
                    const parsedResult = JSON.parse(result.result);
                    setGroupingResult(parsedResult);
                    groupingResultRef.current = parsedResult; // Guardamos en la referencia
                    setNotification({ open: true, severity: 'success', message: 'Bulto agrupado correctamente' });
                    setPalletInfo(parsedResult);
                    setActiveForm(2);
                    reset();

                    setPackageCounter(prevCount => prevCount + 1);
                } else {
                    setLoading(false);
                    setAlert({ open: true, severity: 'error', message: result.message, title: 'ERROR!' });
                    reset();
                }
                setDoGrouping(true);
            } else {
                console.log("se apreto mas de un enter");
            }
        } catch (error) {
            setDoGrouping(true);
            setLoading(false);
            console.error("Error en onSubmitConfirmPackage:", error);
        }
    };

    const BackToGetPallet = () => {
        try {
            setActiveForm(1);
            setGroupingResult(null);
        } catch (error) {
            console.error(error);
        }
    };

    // STYLES
    const btnStyle = {
        color: 'white',
        fontWeight: '500',
        width: '75%',
        padding: '10px',
        display: 'none',
    };
    const btnBackToPalletStyle = {
        color: 'white',
        fontWeight: '500',
        width: '75%',
        padding: '10px',
    };
    const suggestedPalletStyle = {
        backgroundColor: 'rgb(1 133 37 / 60%)',
        color: 'white',
        fontWeight: '500',
        fontSize: '20px',
    };
    const orderLogStyle = {
        backgroundColor: 'rgb(246, 119, 119)',
        color: 'white',
        fontWeight: '500',
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
            {activeForm === 1 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container mt-5">
                        <div className="row mt-3 flex-column align-items-center">
                            <div className="col-md-6 mb-3">
                                <Title title="AGRUPADO" />
                            </div>
                            <div className="d-flex justify-content-center col-md-6 mb-3">
                                <img src={cubo} />
                            </div>
                            <div className="d-flex flex-column mt-4 col-md-6 mb-3">
                                {settingsItems.map((settings, index) => (
                                    <b key={index}><label>{settings.Name} </label></b>
                                ))}
                                <input className="input-group-text" type="text" id="QR" autoFocus autoComplete="off" {...register('QR', { required: true })} />
                                {errors.QR?.type === 'required' && <span className="error">El campo es requerido</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                {groupingResult && (
                                    <div className="d-flex flex-column">
                                        <b>Order: {groupingResult.OrderId}</b>
                                        <b>Package: {groupingResult.Package}</b>
                                        <span>Barcode: {groupingResult.Barcode}</span>
                                        <span>Destiny: {groupingResult.Transport}</span>
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-danger" style={btnStyle}>Confirmar</button>
                            <BtnBackTo redirect="/Grouper/MainMenu"></BtnBackTo>
                        </div>
                    </div>
                </form>
            )}
            {activeForm === 2 && (
                <form onSubmit={handleSubmit(onSubmitConfirmPackage)}>
                    <div className="container mt-5">
                        <div className="row mt-3 flex-column align-items-center">
                            <div className="col-md-6 mb-3">
                                <Title title="CONFIRMAR AGRUPADO" />
                            </div>
                            <div className="d-flex justify-content-center col-md-6 mb-3">
                                <img src={cubo} />
                            </div>
                            <div className="col text-center col-md-6 mb-3">
                                <div style={suggestedPalletStyle} className="mt-2 p-2">
                                    Pallet: <span>{groupingResultRef.current?.DropId ? groupingResultRef.current.DropId : groupingResultRef.current?.NewDropId}</span>
                                </div>
                                <div className="mt-2 p-2" style={{ backgroundColor: '#f0f0f0', color: '#333', fontWeight: '500' }}>
                                    Bultos agrupados: <span>{packageCounter}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column mt-4 col-md-6 mb-3">
                                <b><label>Escanee pallet para confirmar:</label></b>
                                <input className="input-group-text" type="text" id="QR" autoFocus autoComplete="off" {...register('QR', { required: true })} />
                                {errors.QR?.type === 'required' && <span className="error">El campo es requerido</span>}
                            </div>
                            <button className="btn btn-danger" style={btnStyle}>Confirmar</button>
                            <button className="btn btn-danger mt-3" style={btnBackToPalletStyle} onClick={BackToGetPallet}>Volver a Buscar Pallet</button>
                        </div>
                    </div>
                </form>
            )}
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <Dialog open={alert.open} onClose={handleAlertClose}>
                <DialogTitle>{alert.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{alert.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

