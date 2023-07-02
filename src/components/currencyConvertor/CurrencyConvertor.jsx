import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";

export default function CurrencyConvertor() {
  const [currencyName, setCurrencyName] = useState([]);
  const [fromCn, SetFromCn] = useState();
  const [toCn, SetToCn] = useState();
  const [currentAmount, SetCurrentAmount] = useState();
  const [resultantAmount, SetResultantAmount] = useState();
  const data = [
    { label: "Ex opt 1", value: 1 },
    { label: "Ex opt 2", value: 2 },
    { label: "Ex opt 3", value: 3 },
    { label: "Ex opt 4", value: 4 },
  ];

  async function availableCurrencyList() {
    const url =
      "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "651e61a10emsh161e8ac31607372p1ddeefjsn3d94e714628b",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setCurrencyName(Object.entries(result.symbols));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    availableCurrencyList();
  }, []);

  async function counverCur() {
    const url =
      `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCn}&to=${toCn}&amount=${currentAmount}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "651e61a10emsh161e8ac31607372p1ddeefjsn3d94e714628b",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      SetResultantAmount(result.result);
    } catch (error) {
      console.error(error);
    }
  }

  function currency() {}
  return (
    <div className="w-full min-h-[100vh] max-h-fit bg-slate-800">
      <h1 className="h-[10vh] bg-cyan-700 text-center justify-center items-center flex text-2xl text-white uppercase">
        Currency Convertor
      </h1>
      <div className="my-10 w-3/4 md:w-2/4 flex flex-col gap-5 mx-auto">
        <p className="text-white text-xl">Enter the Amount :</p>
        <input
          type="number"
          onChange={(e) => SetCurrentAmount(e.target.value)}
          placeholder="Enter the amount"
          className="p-2 rounded-md caret-cyan-700 outline-none shadow-cyan-700"
        />
        <p className="text-white text-xl">From :</p>
        <select
          onChange={(e) => SetFromCn(e.target.value)}
          className="p-3 rounded-md "
        >
          {currencyName.map(([key, value]) => (
            <option className="text-slate-950" value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
        <p className="text-white text-xl">To :</p>
        <select
          onChange={(e) => SetToCn(e.target.value)}
          className="p-3 rounded-md "
        >
          {currencyName.map(([key, value]) => (
            <option className="text-slate-950" value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={counverCur}
          className="bg-cyan-700 text-white py-3 px-6 my-2 rounded-lg border-b-2 md:w-1/4 w-fit"
        >
          Submit
        </button>
        <p className="text-white text-xl">
          Resultant Amount : <span>{resultantAmount}</span>
        </p>
      </div>
    </div>
  );
}
