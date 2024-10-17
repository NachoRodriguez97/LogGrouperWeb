import { useApiContext } from '../hooks/UseApiContext';
import { fetchData } from '../helpers/fetchData';

export const UsePrint = () => {

  const { apiUrls } = useApiContext();

  const setPrint = async (DropId, endpoint, Group = "", Transport = "") => {

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
      url: apiUrls.logGrouperApi + endpoint,
      dataBody: body,
    });

    return data;

  }

  return { setPrint }
}
