import React from "react"
import {createRoot} from "react-dom/client"
import Home from './Matrix_Calculator/Home';
import Equations from "./Matrix_Calculator/System_of_Equations/equations";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Eigenvalues from "./Matrix_Calculator/Eigenvalues_Calculator/eigenvalue";
const router = createBrowserRouter([
{
    path: "/",
    element: <Home />,
},
{
    path: "/system-of-equations",
    element: <Equations />
},
{
    path: "/eigenvalue_calculator",
    element: <Eigenvalues />
},
]);
const domNode=document.getElementById('root');
const root=createRoot(domNode);
root.render(
    <RouterProvider router={router} />
)
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Home from './Matrix_Calculator/Home';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Home/>
// );
