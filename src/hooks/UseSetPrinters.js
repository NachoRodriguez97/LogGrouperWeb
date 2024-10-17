import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../helpers/fetchData';
import { useApiContext } from '../hooks/UseApiContext';

export const UseSetPrinters = () => {
    const [labelPrinter, setImpresoraPedidos] = useState('');
    const [listLabel, setImpresoraRemitos] = useState('');
    const { apiUrls } = useApiContext();
    const navigate = useNavigate();

    const setPrinters = async (selectedPrinters) => {
        try {

            console.log("impresoras", selectedPrinters);

            const body = {
                printers: selectedPrinters,
                token: localStorage.getItem("token")
            }

            console.log("body", JSON.stringify(body));

            const { data, isLoading } = await fetchData({
                url: apiUrls.logGrouperApi + 'SetPrinters',
                dataBody: body,
            });

            return data
            
        }
        catch (error) {
            console.error("Error in setPrinters:", error);
        }
    };

    return { labelPrinter, listLabel, setPrinters };
}
