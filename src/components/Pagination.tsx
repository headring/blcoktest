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

  useEffect(() => {
    if (mounted.current) {
      const storePage = String(page);
      sessionStorage.setItem("page", storePage);
    }
  }, [page]);

  const onClickPage = (i: number) => {
    mounted.current = true;
    setPage(i);
  };
  const onMinusPage = (page: number) => {
    mounted.current = true;
    if (page - 1 !== 0) {
      setPage(page - 1);
    }
  };
  const onPlusPage = (page: number) => {
    mounted.current = true;
    setPage(page + 1);
  };
  const toEnd = () => {
    mounted.current = true;
    setPage(numPages);
  };
  const toStart = () => {
    mounted.current = true;
    setPage(1);
  };

  const pageBtns = (page: number, numPages: number) => {
    if (numPages <= 5) {
      let btns: number[] = [];
      for (let i = 0; i < numPages; i++) {
        btns.push(i + 1);
      }
      return btns.map((btn) => {
        return (
          <button key={btn} onClick={() => onClickPage(btn)}>
            {btn}
          </button>
        );
      });
    } else if (numPages >= 6) {
      if (page <= 4) {
        let btns = [1, 2, 3, 4, 5];
        return btns.map((btn) => {
          return (
            <button key={btn} onClick={() => onClickPage(btn)}>
              {btn}
            </button>
          );
        });
      } else if (page >= 7) {
        let btns = [6, 7, 8, 9, 10];
        return btns.map((btn) => {
          return (
            <button key={btn + 1} onClick={() => onClickPage(btn)}>
              {btn}
            </button>
          );
        });
      } else if (page <= numPages - 4) {
        let btns = [page - 1, page, page + 1];
        return (
          <>
            <span>...</span>
            {btns.map((btn) => {
              return (
                <button key={btn + 1} onClick={() => onClickPage(btn)}>
                  {btn}
                </button>
              );
            })}
            <span>...</span>
          </>
        );
      }
    }
  };
  const pageRowLimit = (value: number) => {
    setPage(1);
    setLimit(value);
    sessionStorage.setItem("page", "1");
  };

  return (
    <>
      <label>
        페이지 당 행:&nbsp;
        <select
          value={limit}
          onChange={({ target: { value } }) => pageRowLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <div>
        <>
          <button onClick={toStart} disabled={page === 1}>
            l&lt;
          </button>
          <button onClick={() => onMinusPage(page)} disabled={page === 1}>
            &lt;
          </button>
          {pageBtns(page, numPages)}
          <button onClick={() => onPlusPage(page)} disabled={page === numPages}>
            &gt;
          </button>
          <button onClick={toEnd} disabled={page === numPages}>
            &gt;l
          </button>
        </>
      </div>
    </>
  );
};
