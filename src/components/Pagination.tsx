import { Products } from "../App";

interface Props {
  total: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  total,
  limit,
  setLimit,
  page,
  setPage,
}: Props) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <label>
        페이지 당 행:&nbsp;
        <select
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              // aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </div>
    </>
  );
};
