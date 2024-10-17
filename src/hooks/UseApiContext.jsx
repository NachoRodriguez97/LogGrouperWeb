import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [apiUrls, setApiUrls] = useState({
        loginApi: 'http://app-web-test:5560/Login/',
        logGrouperApi:'http://app-web-test:5560/Grouper/',
    });

    return (
        <ApiContext.Provider value={{ apiUrls, setApiUrls }}>
            {children}
        </ApiContext.Provider>
    );
};

const useApiContext = () => {
    return useContext(ApiContext);
};

export { ApiProvider, useApiContext }
