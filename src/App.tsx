import { useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import Search from "./components/Search";
import Table from "./components/Table";
import useDataFetch from "./useDataFetch";
import "./main.sass";

export interface Products {
  [index: string]: string | number | string[];
  title: string;
  brand: string;
  description: string;
}

function App() {
  const [totalProducts, setTotalProducts] = useState<Products[]>([]);
  const [renderProducts, setRenderProducts] = useState<Products[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const offset = (page - 1) * limit;
  const [isSearch, setIsSearch] = useState(false);

  const [option, setOption] = useState("전체");
  const [searchTxt, setSearchTxt] = useState("");

  /** React-Query 데이터 받아오고 상태 저장하기 */
  useEffect(() => {
    setTotal(renderProducts.length);
  }, [renderProducts]);
  const { data } = useDataFetch();
  useEffect(() => {
    if (data) {
      setTotalProducts(data.products);
      setTotal(data.products.length);
      setOption(sessionStorage.getItem("option") as string);
      setSearchTxt(sessionStorage.getItem("searchTxt") as string);
      const parse = JSON.parse(sessionStorage.getItem("result") as string);
      console.log(parse);
      if (parse.length !== 0) {
        setRenderProducts(parse);
      } else {
        setRenderProducts(data.products);
      }
    }
  }, [data]);

  return (
    <div className="main">
      <Search
        option={option}
        setOption={setOption}
        searchTxt={searchTxt}
        setSearchTxt={setSearchTxt}
        renderProducts={renderProducts}
        setRenderProducts={setRenderProducts}
        totalProducts={totalProducts}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
      />
      <div>검색한 테이터: {total}건</div>
      <Table offset={offset} renderProducts={renderProducts} limit={limit} />
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
