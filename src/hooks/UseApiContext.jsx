import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [apiUrls, setApiUrls] = useState({
        //loginApi: 'http://localhost:23773/Login/',
        loginApi: 'http://app-web-test:5560/Login/',
        //loginApi: 'https://apitest-loggrouper.loginter.com.ar/Login/',
        //loginApi: 'http://app-web-01:2010/Login/',
        //logGrouperApi:'http://localhost:23773/Grouper/',
        logGrouperApi:'http://app-web-test:5560/Grouper/',
        //logGrouperApi: 'https://apitest-loggrouper.loginter.com.ar/Grouper/',
        //logGrouperApi:'http://app-web-01:2010/Grouper/'
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