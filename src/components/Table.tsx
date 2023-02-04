import React from "react";

interface Products {
  [index: string]: string | number | string[];
}

interface Props {
  products: Products[];
  offset: number;
  limit: number;
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

const Table = ({ products, offset, limit }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.slice(offset, offset + limit).map((product, idx) => (
          <tr key={idx}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.brand}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.rating}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
