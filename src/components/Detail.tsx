import { useParams, Link } from "react-router-dom"
import { get } from "../utils/client"
import useSWR from "swr"
import Mahasiswa from "../types/mahasiswa"
import Nav from "./Nav"

export default function Detail() {
    let { mahasiswaId } = useParams<{ mahasiswaId: string }>()

    const { data, error, isLoading } = useSWR(
        "http://localhost:8080/api/mahasiswa/" + mahasiswaId,
        (url: string) => get(url).then((res) => res.data as Mahasiswa)
    )

    return (
        <div className="max-w-4xl px-4 lg:px-0 py-8 mx-auto place-items-start">
            <Nav />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div className="p-4 rounded-md text-white bg-slate-800">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-semibold tracking-wider">
                            Nama: {data.nama}
                        </h1>
                        <span className="text-lg px-2 py-1 bg-slate-700 rounded-sm">
                            NIM: {data.nim}
                        </span>
                    </div>
                    <p className="mt-4 text-lg">Jurusan: {data.jurusan}</p>
                    <p className="mt-4 text-right text-lg">
                        Valid Thru: {data.created_at?.slice(0, 10)}
                    </p>
                </div>
            )}
            <Link
                to="/"
                className="px-4 py-2 mt-4 inline-block font-semibold rounded-md bg-amber-800 text-white uppercase tracking-wider"
            >
                Kembali
            </Link>
        </div>
    )
}
