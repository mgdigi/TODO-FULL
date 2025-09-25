import { createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Tache from "../pages/Tache";
import Register from "../pages/Register";

const router  =  createBrowserRouter(
    [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/register",
            element : <Register />

        },
        {
            path: "/todo",
            element: <Tache />
        }
    ]
)


export default router;