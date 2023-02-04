import { useState } from "react";

interface Props {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ limit, setLimit }: Props) => {
  // const [limit, setLimit] = useState(10);
  return (
    <label>
      페이지 당 표시할 게시물 수:&nbsp;
      <select
        value={limit}
        onChange={({ target: { value } }) => setLimit(Number(value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </label>
  );
};
