import React from 'react'
import { BtnBackTo } from "../components/BtnBackTo";
import { Title } from "../components/Title";
import { useNavigate, useParams } from 'react-router-dom';
import { UseFetch } from "../hooks/UseFetch";
import { useApiContext } from '../hooks/UseApiContext';
import CircularProgress from '@mui/material/CircularProgress';


export const Diference = () => {

    const { apiUrls } = useApiContext();
    const { dropId, group, transport } = useParams();

    const body = {
        pallet: {
            dropId: dropId
        },
        token: localStorage.getItem("token")
    }
    const { data, isLoading } = UseFetch({ url: apiUrls.logGrouperApi + 'GetDiference', dataBody: body });


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

    return (
        <div className="container mt-5">
            <div className="row mt-3 selectPrinters">
                <div className='col-md-6 mb-3'>
                    <Title title="Diferencia" />
                </div>
                {isLoading && (
                    <div style={loadingOverlayStyles}>
                        <CircularProgress />
                    </div>
                )}
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Pedidos con diferencia</th>
                        </tr>
                    </thead>
                    {data.result && JSON.parse(data.result).length > 0 ? (
                        JSON.parse(data.result).map(pallets => (
                            <>
                                <tbody>
                                    <tr key={pallets.OrderId}>
                                        <td style={cellStyle}>
                                            {pallets.OrderId}
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        ))
                    ) : !isLoading && (
                        <div className='text-center'>
                            <b>No hay diferencias.</b>
                        </div>
                    )}
                </table>
                <BtnBackTo redirect={`/Grouper/ClosePallet/${dropId}/${group}/${transport}`}></BtnBackTo>
            </div>
        </div>
    )
}
