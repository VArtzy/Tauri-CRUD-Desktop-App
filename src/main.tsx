import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import "./styles.css"
import ErrorPage from "./components/ErrorPage"
import Detail from "./components/Detail"
import Daftar from "./components/Daftar"
import Edit from "./components/Edit"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/mahasiswa/:mahasiswaId",
        element: <Detail />,
    },
    {
        path: "/mahasiswa/daftar",
        element: <Daftar />,
    },
    {
        path: "/mahasiswa/:mahasiswaId/edit",
        element: <Edit />,
    },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
