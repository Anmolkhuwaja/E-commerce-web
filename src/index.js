import React from "react";
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App"
import SignIn from "./Components/auth/sign-in/SignIn.jsx";
import SignUp from "./Components/auth/sign-up/SignUp.jsx";
import Error from "./Components/error/error-page/Error.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
 
    <RouterProvider router={router}/>
);
