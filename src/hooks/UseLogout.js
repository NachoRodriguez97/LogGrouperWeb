import React from 'react'
import { fetchData } from "../helpers/fetchData";
import { useApiContext } from '../hooks/UseApiContext';
import { useNavigate } from 'react-router-dom';

export const UseLogout = () => {
    const { apiUrls } = useApiContext();
    const navigate = useNavigate();

    const setLogout = async () => {
        try{

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
            const dataBody = {
                username: userInfo.username,
                client: userInfo.client
            };
    
            console.log("cerrar sesion",dataBody)
    
            const { data, isLoading } = await fetchData({
                url: apiUrls.loginApi + 'Logout',
                dataBody: dataBody,
            });

            console.log("cerrar sesion data", data);
    
            if (data.isSuccess) {
                localStorage.clear();
                navigate('/');
            }
            else {
                alert('Error al cerrar sesion');
            }
        }
        catch(error){
            console.error(error)
        }
        
    }
    return { setLogout }
}
