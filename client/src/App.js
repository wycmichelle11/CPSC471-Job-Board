import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import WritePost from "./pages/WritePost"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"


const MainPagesLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPagesLayout/>,
    children: [
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/writepost/:id", //id of post
        element: <WritePost />
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/writePost",
    element: <WritePost/>
  },
]);

function App() {
  return(
    <div className="app">
        <RouterProvider router={router}/>
    </div>
  );
}


export default App;
