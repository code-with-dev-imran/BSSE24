import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setData([]);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed: " + res.status);
        if (!canceled) setData(await res.json());
      } catch (e) {
        if (!canceled) setError(e.message);
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    return () => { canceled = true; };
  }, [url]);

  return { loading, error, data };
};
