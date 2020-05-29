import { useState, useEffect } from 'react';

const useCustomErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);
    const reqInterceptor = httpClient.interceptors.request.use((req) => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
        (res) => res,
        (err) => {
            setError(err);
        }
    );
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [httpClient, reqInterceptor, resInterceptor]);
    const errorClearHandler = () => {
        setError(null);
    };
    return [error, errorClearHandler];
};

export default useCustomErrorHandler;
