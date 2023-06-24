import { deleteData, get } from "../utils/client"
import useSWR from "swr"
import { Link } from "react-router-dom"
import Mahasiswa from "../types/mahasiswa"
import { FaTrash, FaEdit } from "react-icons/fa"
import { confirm } from "@tauri-apps/api/dialog"

export default function List() {
    const { data, error, isLoading, mutate } = useSWR(
        "http://localhost:8080/api/mahasiswa",
        (url: string) => get(url).then((res) => res.data as Mahasiswa[])
    )

    const handleDelete = async (mahasiswaId: number | undefined) => {
        const confirmed = await confirm(
            "Yakin mau hapus mahasiswa ini?",
            "Maba!"
        )
        if (mahasiswaId && confirmed) {
            deleteData(`http://localhost:8080/api/mahasiswa/${mahasiswaId}`)
                .then(() => {
                    mutate()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <h2 className="text-2xl mb-4 font-semibold">Daftar Mahasiswa: </h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {data.map((mhs: Mahasiswa) => (
                        <div
                            className="p-4 rounded-md text-white bg-slate-800"
                            key={mhs.id}
                        >
                            <Link
                                to={`/mahasiswa/${mhs.id}`}
                                className="flex justify-between items-start"
                            >
                                <div className="flex">
                                    <h3 className="font-semibold tracking-wider max-w-[15ch]">
                                        {mhs.nama}
                                    </h3>
                                </div>
                                <span className="px-2 py-1 bg-slate-700 rounded-sm text-sm">
                                    {mhs.nim}
                                </span>
                            </Link>
                            <button
                                onClick={() => handleDelete(mhs.id)}
                                className="mt-4 inline-block"
                            >
                                <FaTrash />
                            </button>
                            <Link
                                to={`/mahasiswa/${mhs.id}/edit`}
                                className="ml-4 inline-block"
                            >
                                <FaEdit />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
