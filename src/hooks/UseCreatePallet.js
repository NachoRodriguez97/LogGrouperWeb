import { fetchData } from '../helpers/fetchData';
import { useApiContext } from '../hooks/UseApiContext';

export const UseCreatePallet = () => {

  const { apiUrls } = useApiContext();

  const setCreatePallet = async (palletInfo) => {

    const body = {
      pallet: palletInfo, 
      token: localStorage.getItem("token"),
    }

    console.log("body", JSON.stringify(body));

    const { data, isLoading } = await fetchData({
      url: apiUrls.logGrouperApi + 'CreatePalletEvent',
      dataBody: body,
    });

    return data;

  }

  return { setCreatePallet }
}
