import "./App.css";
import React, { useState } from "react";
import integration from "./data";

function App() {
  const option = [
    {
      value: "Optym",
    },
    {
      value: "Google",
    },
  ];

  const table = [
    {
      heading: "Ename",
    },
    {
      heading: "EId",
    },
    {
      heading: "Dob",
    },
    {
      heading: "Designation",
    },
  ];

  const [company, setCompany] = useState("Optym");
  const [result, setResult] = useState(integration[0].getData());
  const [order, setOrder] = useState("ASC");
  function ChangeData() {
    for (var i = 0; i < integration.length; i++) {
      if (integration[i].value === company) {
        setResult(integration[i].getData());
      }
    }
  }

  // SORTING FUNCTIONS

  // function idSort(EId) {
  //   if (order === "ASC") {
  //     const data = [...result].sort((a, b) => a[EId] - b[EId]);
  //     setResult(data);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const data = [...result].sort((a, b) => b[EId] - a[EId]);
  //     setResult(data);
  //     setOrder("ASC");
  //   }
  // }
  function Sorting(col) {
    if (order === "ASC") {
      const data = [...result].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setResult(data);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const data = [...result].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setResult(data);
      setOrder("ASC");
    }
  }

  // function dateSort(Dob) {
  //   console.log(order)
  //   if (order === "ASC") {
  //     const data = [...result].sort((a, b) => {
  //       let da = new Date(a.Dob);
  //       let db = new Date(b.Dob);
  //       return da - db;
  //     });
  //     setResult(data);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const data = [...result].sort((a, b) => {
  //       let da = new Date(a[Dob]);
  //       let db = new Date(b[Dob]);
  //       return db - da;
  //     });
  //     setResult(data);
  //     setOrder("ASC");
  //   }
  // }
  return (
    <div className="App">
      <div className="box">
        <select
          onChange={(e) => setCompany(e.target.value)}
          onClick={ChangeData}
          value={company}
        >
          {option.map((data) => (
            <option value={data.value}>{data.value}</option>
          ))}
        </select>
      </div>
      <div className="table-content">
        <table>
          {table.map((item) => (
            <th onClick={() => Sorting(`${item.heading}`)}>
              {item.heading}
            </th>
          ))}

          {result.map((item) => (
            <tr>
              <td>{item.Ename}</td>
              <td>{item.EId}</td>
              <td>{item.Dob}</td>
              <td>{item.Designation}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
