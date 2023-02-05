import React from "react";
import { Products } from "../App";

interface Props {
  renderProducts: Products[];
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

const Table = ({ renderProducts, offset, limit }: Props) => {
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
        {renderProducts.slice(offset, offset + limit).map((product, idx) => (
          <tr key={idx}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.brand}</td>
            <td className="description">
              {product.description.slice(0, 40)}
              {product.description.length > 40 && "..."}
            </td>
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
