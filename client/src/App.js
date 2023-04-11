import React, {useState, useEffect} from 'react';
import './css/App.css';
import './css/Home.css';
import './css/Login.css';
import './css/Register.css';
import './css/WritePost.css';
import './css/Resume.css'
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
import EditPost from "./pages/EditPost"
import AddResume from "./pages/AddResume"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import MyAccount from "./pages/MyAccount"
import AppliedTo from "./pages/AppliedTo"


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
        path:"/home/editpost/:jobid" , //id of post
        element: <EditPost />
      },
      {
        path:"/home/myaccount", //id of post
        element: <MyAccount />
      },
      {
        path:"/home/resume", //id of post
        element: <AddResume />
      },
      {
        path:"/home/appliedto", //id of post
        element: <AppliedTo />
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
