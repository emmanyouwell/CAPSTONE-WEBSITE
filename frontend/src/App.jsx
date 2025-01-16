import React,{ useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { FooterWithLogo } from "./Components/Footer";
import DonorApplication from "./Pages/User/DonorApplication";
import Article from "./Pages/Article";
import SingleArticle from "./Pages/SingleArticle";
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/donor-application" element={<DonorApplication/>}/>
      <Route path="/articles" element={<Article/>}/>
      <Route path="/article/id" element={<SingleArticle/>}/>
    </Routes>
    <FooterWithLogo/>
   </BrowserRouter>
  );
}

export default App;
