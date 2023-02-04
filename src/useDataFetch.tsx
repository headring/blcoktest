import { useQuery } from "@tanstack/react-query";

const fetchFunction = async () => {
  // const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  const url = "https://dummyjson.com/products?limit=100";
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

const useDataFetch = () => {
  return useQuery(["get/DataFetch"], () => fetchFunction(), {
    // enabled: false,
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
