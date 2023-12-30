import { useEffect, useState } from 'react';

export type FetchDataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function TestFetch() {
  const [fetchData, setFetchData] = useState<FetchDataType | null>(null);

  useEffect(() => {
    function go<T>(url: string): Promise<T> {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => data as T);
    }

    (async () => {
      setFetchData(await go<FetchDataType>('https://jsonplaceholder.typicode.com/todos/1'));
    })();
  }, []);

  return <div>{fetchData !== null ? fetchData.id : 'Loading...'}</div>;
}

export default TestFetch;
