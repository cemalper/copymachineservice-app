import { useState, useEffect } from 'react';

const useMergedInitialValues = (initialValues, queryString) => {
  const [mergedInitialValues, setMergedInitialValues] = useState(initialValues);
  useEffect(() => {
    const urlParams = new URLSearchParams(queryString);
    const params = Object.fromEntries(urlParams);
    setMergedInitialValues({ ...initialValues, ...params });
    //eslint-disable-next-line
  }, [queryString]);

  return mergedInitialValues;
};

export default useMergedInitialValues;
