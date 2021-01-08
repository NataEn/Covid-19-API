import "./App.css";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import { getCountriesInContinent } from "./utils/apiCalls";

const App = () => {
  const [continent, setContinent] = useState("Africa");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const countries = getCountriesInContinent(continent);
    return () => {
      //cleanup;
    };
  }, [continent]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID 19 WORLD Data</h1>
      </header>
      <Chart data={chartData} />
    </div>
  );
};

export default App;
