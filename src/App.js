// import React, { useState, useEffect } from 'react';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form.jsx';
import './App.css'

function App(props) {

  // const [stocks, setStocks] = useState([])
  
  // const searchOptions = {
  //   key: process.env.REACT_APP_API_KEY,
  //   api: `https://finnhub.io/docs/api/v1/`
  // }

  return (
    <div>
      <Header />
      <Form />
    </div>
  );
}

export default App;
