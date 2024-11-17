import React from "react";
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App"
import SignIn from "./Components/auth/sign-in/SignIn.jsx";
import SignUp from "./Components/auth/sign-up/SignUp.jsx";
import Error from "./Components/error/error-page/Error.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import Layout from "./Components/Layout.jsx";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <App />,
            },
            {
                path: "product-details/:product_id",
                element: <ProductDetails />,
            },
        ],
        errorElement: <Error />,
    },
   
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
);
