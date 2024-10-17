import React from 'react'
import { BtnBackTo } from "../components/BtnBackTo";
import { Title } from "../components/Title";
import { useNavigate } from 'react-router-dom';
import { UseFetch } from "../hooks/UseFetch";
import { useApiContext } from '../hooks/UseApiContext';
import CircularProgress from '@mui/material/CircularProgress';

export const Pallets = () => {

    const { apiUrls } = useApiContext();
    const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'LogByUser', dataBody: localStorage.getItem("token") });

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '90%',
    };

    const cellStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
        textAlign: 'left',
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

    const headerStyle = {
        backgroundColor: 'lightgray',
        padding: '8px',
        textAlign: 'left',
    };

    const navigate = useNavigate();

    const handleButtonClick = (dropId, group, transport) => {
        // Realiza la redirección a la página deseada
        console.log("dropid", dropId + ' ' + group + ' ' + transport)
        navigate(`/Grouper/PalletDetail/${dropId}/${group}/${transport}`);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row mt-3 selectPrinters">
                    <div className='col-md-6 mb-3'>
                        <Title title="PALLETS" />
                    </div>
                    {isLoading && (
                        <div style={loadingOverlayStyles}>
                            <CircularProgress />
                        </div>
                    )}
                    {data.result && JSON.parse(data.result).length > 0 ? (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={headerStyle}>Pallet</th>
                                    <th style={headerStyle}>Grupo</th>
                                    <th style={headerStyle}>Qty</th>
                                    <th style={headerStyle}></th>
                                    <th style={headerStyle}>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(data.result).map(pallets => (
                                    <tr key={pallets.DropId}>
                                        <td style={cellStyle}>{pallets.DropId}</td>
                                        <td style={cellStyle}>{pallets.Group}</td>
                                        <td style={cellStyle}>{pallets.Package}</td>
                                        <td style={cellStyle}>
                                            <button className="btn btn-success" onClick={() => handleButtonClick(pallets.DropId, pallets.Group == '' ? '0' : pallets.Group, pallets.Transport)}>
                                                ABRIR
                                            </button>
                                        </td>
                                        <td style={cellStyle}>{pallets.AddWho}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : !isLoading && (
                        <div className='text-center'>
                            <b>No hay pallets en curso.</b>
                        </div>
                    )}
                    <BtnBackTo redirect="/Grouper/MainMenu"></BtnBackTo>
                </div>
            </div>
        </>
    )
}
