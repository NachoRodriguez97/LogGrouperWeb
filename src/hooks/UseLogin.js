import { fetchData } from "../helpers/fetchData";
import { useApiContext } from '../hooks/UseApiContext';

export const UseLogin = () => {

  const { apiUrls } = useApiContext();

  const setLogin = async (dataBody) => {
    try {

      const { data, isLoading } = await fetchData({
        url: apiUrls.loginApi + 'Authenticate',
        dataBody: dataBody,
      });

      if (data.isSuccess) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("Settings", data.settings);
        return data;
      } else {
        return data
      }

    } catch (error) {
      console.error("Error in setLogin:", error);
    }
  };

  return { setLogin };
};
