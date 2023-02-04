import { useEffect, useState } from "react";
import { Table } from "./components/Table";
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
  const { isSuccess, data } = useDataFetch();
  useEffect(() => {
    if (data) setProducts(data.products);
  }, [isSuccess, data]);
  console.log(products);
  return (
    <div>
      <Table products={products} />
    </div>
  );
}

export default App;
