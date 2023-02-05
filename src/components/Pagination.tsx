import { useEffect, useRef } from "react";

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
  const mounted = useRef(false);
  console.log(mounted.current);
  useEffect(() => {
    if (mounted.current) {
      console.log("page mounted true");
      const storePage = String(page);
      sessionStorage.setItem("page", storePage);
    }
  }, [page]);
  const onClickPage = (i: number) => {
    mounted.current = true;
    setPage(i + 1);
  };

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
        {/* {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <button key={i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))} */}
        {page}
        {page <= 4 &&
          Array(numPages)
            .fill(0)
            .map(
              (_, i) =>
                i < 5 && (
                  <button key={i + 1} onClick={() => onClickPage(i)}>
                    {i + 1}
                  </button>
                )
            )}
        {page >= 5 && page <= 7}
        {page > 6 &&
          Array(numPages)
            .fill(0)
            .map(
              (_, i) =>
                i > 4 && (
                  <button key={i + 1} onClick={() => onClickPage(i)}>
                    {i + 1}
                  </button>
                )
            )}
        {/* {page >= numPages - 5 &&
          Array(numPages)
            .fill(0)
            .map(
              (_, i) =>
                numPages - 5 < i && (
                  <button key={i + 1} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                )
            )} */}
        {/* {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <button key={i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))} */}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </div>
    </>
  );
};
