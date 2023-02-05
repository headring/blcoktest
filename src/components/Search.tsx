import { useEffect, useRef } from "react";
import { Products } from "../App";

interface Props {
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  searchTxt: string;
  setSearchTxt: React.Dispatch<React.SetStateAction<string>>;
  renderProducts: Products[];
  setRenderProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  totalProducts: Products[];
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({
  option,
  setOption,
  searchTxt,
  setSearchTxt,
  renderProducts,
  setRenderProducts,
  totalProducts,
  isSearch,
  setIsSearch,
}: Props) => {
  const mounted = useRef(false);

  const onClick = () => {
    sessionStorage.setItem("option", option);
    sessionStorage.setItem("searchTxt", searchTxt);
    if (option === "전체") {
      setRenderProducts(
        totalProducts.filter((product) => {
          return (
            product.title.includes(searchTxt) ||
            product.brand.includes(searchTxt) ||
            product.description.includes(searchTxt)
          );
        })
      );
    }
    if (option === "상품명") {
      setRenderProducts(
        totalProducts.filter((product) => product.title.includes(searchTxt))
      );
    }
    if (option === "브랜드") {
      setRenderProducts(
        totalProducts.filter((product) => product.brand.includes(searchTxt))
      );
    }
    if (option === "상품내용") {
      setRenderProducts(
        totalProducts.filter((product) =>
          product.description.includes(searchTxt)
        )
      );
    }
    setIsSearch((prev) => !prev);
    mounted.current = true;
  };
  useEffect(() => {
    console.log(mounted);
    if (mounted.current) {
      console.log("why");
      const prevResult = JSON.stringify(renderProducts);
      sessionStorage.setItem("result", prevResult);
    }
  }, [isSearch]);

  return (
    <div>
      <div>검색</div>
      <select
        value={option}
        onChange={({ target: { value } }) => setOption(value)}
      >
        <option value="전체">젠체</option>
        <option value="상품명">상품명</option>
        <option value="브랜드">브랜드</option>
        <option value="상품내용">상품내용</option>
      </select>
      <div>
        <input
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
      </div>
      <button onClick={onClick}>조회</button>
    </div>
  );
};
export default Search;
