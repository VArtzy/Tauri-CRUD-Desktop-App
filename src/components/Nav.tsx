import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-4xl mb-4 font-bold leading-tight tracking-wider text-amber-800">
                <Link to="/">Maba!</Link>
            </h1>
            <Link
                to="/mahasiswa/daftar"
                className="p-2 bg-slate-200 rounded-md text-sm font-semibold tracking-wide"
            >
                Jadi mahasiswa, sekarang juga.
            </Link>
        </div>
    )
}
