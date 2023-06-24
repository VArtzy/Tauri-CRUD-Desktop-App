import { Link } from "react-router-dom"
import Nav from "./Nav"

export default function ErrorPage() {
    return (
        <div className="max-w-4xl px-4 lg:px-0 py-8 mx-auto grid gap-8 place-content-center h-[90vh]">
            <Nav />
            <h2 className="text-3xl font-semibold tracking-wider">
                Maaf, Halaman ini tidak ditemukan :(
            </h2>
            <Link
                to="/"
                className="px-4 py-2 mt-4 rounded-md  font-semibold bg-amber-800 text-white uppercase tracking-wider text-center"
            >
                Home
            </Link>
        </div>
    )
}
