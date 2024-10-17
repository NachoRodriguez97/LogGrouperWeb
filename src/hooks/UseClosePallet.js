import { useApiContext } from '../hooks/UseApiContext';
import { fetchData } from '../helpers/fetchData';

export const UseClosePallet = () => {

  const { apiUrls } = useApiContext();

  const setClosePallet = async (DropId, Group, Transport) => {

    const body = {
      pallet: {
        dropId: DropId,
        group: Group,
        transport: Transport
      },
      token: localStorage.getItem("token")
    }

    console.log("body", JSON.stringify(body));

    const { data, isLoading } = await fetchData({
      url: apiUrls.logGrouperApi + 'ClosePallet',
      dataBody: body,
    });

    return data;

  }

  return { setClosePallet }
}
