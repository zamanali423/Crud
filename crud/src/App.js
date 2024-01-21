import logo from './logo.svg';
import './App.css';
import Modal from './Modal';
import Tables from './Tables';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const api = async () => {
    const url = "http://localhost:3001/api/getAll";
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  return (
    <>
      <div className="heading">
      <h1 className='crud'>CRUD APP</h1>
      </div>
      <div className="container mt-2">
      <Modal api={api}/>
      </div>
      <div className="container my-5">
      <Tables api={{api,data}}/>
      </div>
    </>
  );
}

export default App;
