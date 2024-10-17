import React from 'react'
import { BtnMenu } from "../components/BtnMenu"
import { UseFetch } from "../hooks/UseFetch";
import CircularProgress from '@mui/material/CircularProgress';
import { useApiContext } from '../hooks/UseApiContext';
import { useEffect, useState } from "react";

export const MainMenu = () => {

    const { apiUrls } = useApiContext();
    const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'GetEventStatus', dataBody: localStorage.getItem("token") });
    const [settingsItems, setSettings] = useState([]);

    const event = false;

    useEffect(() => {
        // Obtener settings desde localStorage
        const storedSettings = localStorage.getItem('Settings');
        const parsedSettings = storedSettings ? JSON.parse(storedSettings) : [];
        var filteredSettings = parsedSettings.filter(item => item.Module === 'MainMenu');

        setSettings(filteredSettings);
    }, []);

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
            <div className='d-flex flex-column'>
                <>
                {settingsItems.map((settings, index) => (
                    <BtnMenu name = {settings.Name} redirect={`/Grouper/${settings.Functionality}`} />
                ))}
                </>
            </div>
        </>
    );
};
