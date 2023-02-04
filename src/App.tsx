import { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import Search from "./components/Search";
import Table from "./components/Table";
import useDataFetch from "./useDataFetch";

export interface Products {
  [index: string]: string | number | string[];
}
const tableHeaders = [
  "상품번호",
  "상품명",
  "브랜드",
  "싱품내용",
  "가격",
  "평점",
  "재고",
];

function App() {
  // const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<Products[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const offset = (page - 1) * limit;

  const { refetch, isSuccess, data } = useDataFetch();
  useEffect(() => {
    if (data) {
      setProducts(data.products);
      setTotal(data.products.length);
    }
  }, [isSuccess, data]);
  // useEffect(() => {
  //   refetch();
  // }, [limit, skip]);
  return (
    <div>
      <Search />
      <div>검색한 테이터: {total}건</div>
      <Table offset={offset} products={products} limit={limit} />
      <Pagination
        total={total}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
