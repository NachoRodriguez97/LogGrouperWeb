import { fetchData } from '../helpers/fetchData';
import { useApiContext } from '../hooks/UseApiContext';

export const UseFilteredPallets = () => {

  const { apiUrls } = useApiContext();

  const setFilteredPallets = async (palletInfo) => {

    const body = {
      pallet: palletInfo, 
      token: localStorage.getItem("token"),
    }

    console.log("body", JSON.stringify(body));

    const { data, isLoading } = await fetchData({
      url: apiUrls.logGrouperApi + 'GetFilteredPallets',
      dataBody: body,
    });

    return data;

  }

  return { setFilteredPallets }
}
