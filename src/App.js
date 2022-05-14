import "./App.css";
import React, { useState } from "react";
import Image from "./Image"
import { saveAs } from 'file-saver';



function App() {
  const[results,setResults]=useState([])
  const[value,setValue]=useState("")
  const shuffleData=["fashion","film","car","bike","boat","nature","sunset","dark","food","ocean","Textures & Patterns","beauty","lake","forest","moon","action","animal","lion","kids","gods","history"]
  const [random,setRandom]=useState(shuffleData[0])
  const [pageNumber, setPageNumber] = useState(0);
  const [pageRange,setPageRange]=useState(2)

 
  const next=(e)=>{
    if(pageRange<=20){
    setPageNumber(pageNumber+2)
    setPageRange(pageRange+2)
  }
    e.preventDefault()
  }
  const previous=(e)=>{
    if(pageNumber>=0){
    setPageNumber(pageNumber-2)
    setPageRange(pageRange-2)
  }
     e.preventDefault()
  }
  const search=(e)=>{
    setValue("")
    fetch(`https://api.unsplash.com/search/photos/?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&per_page=20&query=${value}`)
    .then(res=>res.json())
     .then(data=>{
       console.log(data)
       setResults(data.results)
     })
     e.preventDefault()
  }
  

   const shuffle=()=>{
    let differentValue=Math.floor(Math.random() *20)
    setRandom(shuffleData[differentValue])
   }

  const fetchData=()=>{
    shuffle()
    fetch(`https://api.unsplash.com/search/photos/?client_id=Bn1bLki8GqBZxK6bCE9MpLlKUvlVeB34M1Trm7A2was&per_page=20&query=${random}`)
     .then(res=>res.json())
      .then(data=>{
        setResults(data.results)
      })
  }
  const download = () => {
    const data="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb";
    saveAs(data)
  }
 
  return (
    <div className="App">
      <input value={value} onChange={(e)=>setValue(e.target.value)}></input>
      <button onClick={()=>search()}>Search</button>
      <button onClick={()=>fetchData()}>Shuffle</button>
      <Image results={results} pageNumber={pageNumber} pageRange={pageRange}></Image>
     
      <button onClick={()=>previous()}>previous</button>
      <button onClick={()=>next()}>next</button>
      <button onClick={()=>download()}>Download</button>
      
    </div>
  );
}

export default App;
