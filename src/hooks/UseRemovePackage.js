import { useApiContext } from '../hooks/UseApiContext';
import { fetchData } from '../helpers/fetchData';

export const UseRemovePackage = () => {
    const { apiUrls } = useApiContext();

  const setRemovePackage = async (orderInfo) => {

    const body = {
      qrInfo: orderInfo.QR,
      token: localStorage.getItem("token"),
    }

    console.log("body", JSON.stringify(body));

    const { data, isLoading } = await fetchData({
      url: apiUrls.logGrouperApi + 'RemovePackage',
      dataBody: body,
    });

    return data;

  }

  return { setRemovePackage }
}
