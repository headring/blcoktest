import { useQuery } from "@tanstack/react-query";

interface Assemble {
  limit: number;
  skip: number;
}

const fetchFunction = async (limit: number, skip: number) => {
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const useDataFetch = (limit: number, skip: number) => {
  return useQuery(["get/DataFetch"], () => fetchFunction(limit, skip), {
    enabled: false,
    cacheTime: 5 * 6000,
    staleTime: 5 * 6000,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useDataFetch;
