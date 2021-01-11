import { json } from "express";
import React, { useState, useEffect } from "react";
const DataChart = (props) => {
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return <div>{JSON.stringify(props)}</div>;
};
export default DataChart;
