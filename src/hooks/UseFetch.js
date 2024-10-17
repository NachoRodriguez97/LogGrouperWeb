
import { useState, useEffect } from 'react';
import { fetchData } from '../helpers/fetchData';

export const UseFetch = ({ url, dataBody }) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const { data, isLoading } = await fetchData({ url, dataBody });
      console.log(data)
      if (data.isSuccess) {
        setData(data);
        setIsLoading(false);
      } else {
        setData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { data, isLoading };
};
