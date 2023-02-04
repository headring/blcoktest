import { useEffect, useState } from "react";
import useDataFetch from "./useDataFetch";

function App() {
  const { isSuccess, data } = useDataFetch();
  useEffect(() => {
    if (data) console.log(data);
  }, [isSuccess, data]);

  return <div className="App">hi</div>;
}

export default App;
