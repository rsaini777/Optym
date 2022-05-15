import "./App.css";
import React, { useEffect, useState } from "react";
import Image from "./Image";

function App() {
  
  const [results, setResults] = useState([]);  
  const [value, setValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageRange, setPageRange] = useState(2);

  {/* Adding initial data using lifecylce mount method */}

  useEffect(() => {
    fetch("https://api.unsplash.com/photos/random?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&count=50")
    .then(response => response.json())
    .then(data => setResults(data))
  },[])
   
 {/* Change image Function slider */}

  const next = (e) => {
    if (pageRange <= 50) {
      setPageNumber(pageNumber + 2);
      setPageRange(pageRange + 2);
    }
    e.preventDefault();
  };
  const previous = (e) => {
    if (pageNumber >= 0) {
      setPageNumber(pageNumber - 2);
      setPageRange(pageRange - 2);
    }
    e.preventDefault();
  };

   {/* Search function use in search bar input for giving results */}

  const search = (e) => {
    setValue("");
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&per_page=50&query=${value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
      });
    e.preventDefault();
  };

  
   {/* fetchData function use in shuffle button giving random image */}
  const fetchData = (e) => {
  
    fetch(
      `https://api.unsplash.com/photos/random?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&count=50`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
      e.preventDefault()
  };

  return (
    <div className="App">
      <div className="d-md-flex justify-content-center text-center mt-5 justify-content-around">
        <h1 className="logo mt-5">Gallery</h1>
        <div>
          <div className="search_wrap search_wrap_3">
            <div className="search_box mt-5">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input"
                placeholder="search..."
              />
              <div className="btn btn_common">
                <button
                  type="button"
                  className="downlaod-btn btn"
                  onClick={() => search()}
                >
                  <i className=" fas ri-search-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="d-flex justify-content-sm-center ">
          <button onClick={() => fetchData()} className=" shuffle mt-5 ">
            Shuffle <i className="ri-shuffle-fill"></i>
          </button>
          </div>
        </div>
      </div>
      {/* first row */}
      <div className="d-flex">
        <Image
          results={results}
          pageNumber={pageNumber}
          pageRange={pageRange}
          className="display"
        ></Image>
  </div>

      <div className="d-flex  justify-content-center down-btn">
        <button
          onClick={() => previous()}
          className="ms-5 previous px-4 py-2 display-6"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button
          onClick={() => next()}
          className="ms-5 next px-4 py-2 display-6"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
