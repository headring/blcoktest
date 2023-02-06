import { MutableRefObject, useMemo } from "react";
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
  setPage: React.Dispatch<React.SetStateAction<number>>;
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
  setPage,
}: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("option", option);
    sessionStorage.setItem("searchTxt", searchTxt);
    const lowerCaseSearch = searchTxt.toLocaleLowerCase();
    if (option === "전체") {
      setRenderProducts(
        totalProducts.filter((product) => {
          return (
            product.title.toLowerCase().includes(lowerCaseSearch) ||
            product.brand.toLowerCase().includes(lowerCaseSearch) ||
            product.description.toLowerCase().includes(lowerCaseSearch)
          );
        })
      );
    }
    if (option === "상품명") {
      setRenderProducts(
        totalProducts.filter((product) =>
          product.title.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }
    if (option === "브랜드") {
      setRenderProducts(
        totalProducts.filter((product) =>
          product.brand.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }
    if (option === "상품내용") {
      setRenderProducts(
        totalProducts.filter((product) =>
          product.description.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }
    setIsSearch((prev) => !prev);
    mounted.current = true;
    setPage(1);
  };
  useEffect(() => {
    if (mounted.current) {
      const prevResult = JSON.stringify(renderProducts);
      sessionStorage.setItem("result", prevResult);
    }
  }, [isSearch]);

  return (
    <div>
      <div>검색</div>
      <form onSubmit={(e) => onSubmit(e)}>
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
            ref={input}
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>
        <button>조회</button>
      </form>
    </div>
  );
};
export default Search;
