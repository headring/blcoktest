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
    setPage(page - 1);
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
      return Array(numPages)
        .fill(0)
        .map((_, i) => (
          <button key={i + 1} onClick={() => onClickPage(i)}>
            {i + 1}
          </button>
        ));
    } else if (numPages >= 6) {
      if (page <= 4) {
        let btns = [1, 2, 3, 4];
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

//  {
//    numPages <= 5 ? (
//      Array(numPages)
//        .fill(0)
//        .map((_, i) => (
//          <button key={i + 1} onClick={() => setPage(i + 1)}>
//            {i + 1}
//          </button>
//        ))
//    ) : (
//      // 현재 page가 4라면?
//      // 현재 page가 7이라면?
//      <div>hi</div>
//    );
//  }
//  {
//    /* {Array(numPages)
//           .fill(0)
//           .map((_, i) => (
//             <button key={i + 1} onClick={() => setPage(i + 1)}>
//               {i + 1}
//             </button>
//           ))} */
//  }
//  {
//    /* {page} */
//  }
//  {
//    /* {page <= 4 &&
//           Array(numPages)
//             .fill(0)
//             .map(
//               (_, i) =>
//                 i < 5 && (
//                   <button key={i + 1} onClick={() => onClickPage(i)}>
//                     {i + 1}
//                   </button>
//                 )
//             )} */
//  }
//  {
//    /* 456 */
//  }
//  {
//    /* 567 */
//  }
//  {
//    /* {page >= 5 &&
//           page <= 6 &&
//           Array(numPages)
//             .fill(0)
//             .map(
//               (_, i) =>
//                 i > 3 &&
//                 i < 7 && (
//                   <button key={i + 1} onClick={() => onClickPage(i)}>
//                     {i + 1}
//                   </button>
//                 )
//             )}
//         {page > 6 &&
//           Array(numPages)
//             .fill(0)
//             .map(
//               (_, i) =>
//                 i > 4 && (
//                   <button key={i + 1} onClick={() => onClickPage(i)}>
//                     {i + 1}
//                   </button>
//                 )
//             )} */
//  }
//  {
//    /* {page >= numPages - 5 &&
//           Array(numPages)
//             .fill(0)
//             .map(
//               (_, i) =>
//                 numPages - 5 < i && (
//                   <button key={i + 1} onClick={() => setPage(i + 1)}>
//                     {i + 1}
//                   </button>
//                 )
//             )} */
//  }
//  {
//    /* {Array(numPages)
//           .fill(0)
//           .map((_, i) => (
//             <button key={i + 1} onClick={() => setPage(i + 1)}>
//               {i + 1}
//             </button>
//           ))} */
//  }
