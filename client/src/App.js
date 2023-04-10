import React, {useState, useEffect} from 'react';
import './css/App.css';
import './css/Home.css';
import './css/Login.css';
import './css/Register.css';
import './css/WritePost.css';
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
import MyAccount from "./pages/MyAccount"


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
    element: <Register/>
  },
  {
    path: "/home",
    element: <MainPagesLayout/>,
    children: [
      {
        path:"/home",
        element: <Home />
      },
      {
        path:"/home/writepost", //id of post
        element: <WritePost />
      },
      {
        path:"/home/myaccount", //id of post
        element: <MyAccount />
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/home/writePost",
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
