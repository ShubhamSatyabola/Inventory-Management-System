import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from './features/auth/components/Login';
import { Signup } from './features/auth/components/Signup';
import { Protected } from './features/auth/components/Protected';
import { GenerateQrCode } from './pages/GenerateQrCode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectComponent } from './features/Product/productSlice';
import { Home } from './pages/Home';
import { Scanner } from './features/Product/Components/Scanner';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/generateQr",
    element: (
      <Protected>
        <GenerateQrCode />
      </Protected>
    ),
  },
  {
    path: "/scanQr",
    element: (
      <Protected>
        <Scanner/>
      </Protected>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "*",
  //   element: <ErrorPage></ErrorPage>,
  // },
]);

function App() {
  const data = useSelector(selectComponent);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProductsAsync());
  },[])
  
  
   
    return (
    data.length  &&
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}




export default App;
