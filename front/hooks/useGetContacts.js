import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useGetContacts = (userId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}${userId}`);
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}${userId}`);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetContacts;
