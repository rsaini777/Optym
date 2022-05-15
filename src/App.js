import "./App.css";
import React, { useState } from "react";
import Image from "./Image";

function App() {
 
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const shuffleData = [
    "fashion",
    "film",
    "car",
    "bike",
    "boat",
    "nature",
    "sunset",
    "dark",
    "food",
    "ocean",
    "Textures & Patterns",
    "beauty",
    "lake",
    "forest",
    "moon",
    "action",
    "animal",
    "lion",
    "kids",
    "gods",
    "history",
  ];
  const [random, setRandom] = useState(shuffleData[0]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageRange, setPageRange] = useState(2);

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

  const shuffle = () => {
    let differentValue = Math.floor(Math.random() * 20);
    setRandom(shuffleData[differentValue]);
  };

  const fetchData = () => {
    shuffle();
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&per_page=50&query=${random}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
      });
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
