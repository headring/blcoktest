import { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import Search from "./components/Search";
import Table from "./components/Table";
import useDataFetch from "./useDataFetch";

interface Products {
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
  const [products, setProducts] = useState<Products[]>([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const { refetch, isSuccess, data } = useDataFetch(limit, skip);
  useEffect(() => {
    if (data) setProducts(data.products);
  }, [isSuccess, data]);
  useEffect(() => {
    refetch();
  }, [limit, skip]);
  return (
    <div>
      <Search />
      <div>검색한 테이터: {products.length}건</div>
      <Table products={products} />
      <Pagination limit={limit} setLimit={setLimit} />
    </div>
  );
}

export default App;
