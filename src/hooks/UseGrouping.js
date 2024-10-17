import { fetchData } from '../helpers/fetchData';
import { useApiContext } from '../hooks/UseApiContext';

export const UseGrouping = () => {

  const { apiUrls } = useApiContext();

  const setGrouping = async (orderInfo, endpoint, palletInfo) => {

    console.log("orderinfo", orderInfo.QR);
    console.log("endpoint", endpoint);
    console.log("palletInfo", palletInfo);

    const body = {
      qrInfo: orderInfo.QR, //LOG ID
      pallet: palletInfo, 
      token: localStorage.getItem("token"),
    }

    console.log("body", JSON.stringify(body));

    const { data, isLoading } = await fetchData({
      url: apiUrls.logGrouperApi + endpoint,
      dataBody: body,
    });

    return data;

  }

  return { setGrouping }
}
