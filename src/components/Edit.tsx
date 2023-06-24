import { useEffect, useState } from "react"
import useSWR from "swr"
import Nav from "./Nav"
import { get, put } from "../utils/client"
import { Link, useParams } from "react-router-dom"
import Mahasiswa from "../types/mahasiswa"
import { message } from "@tauri-apps/api/dialog"

export default function Edit() {
    let { mahasiswaId } = useParams<{ mahasiswaId: string }>()

    const { data, mutate } = useSWR(
        "http://localhost:8080/api/mahasiswa/" + mahasiswaId,
        (url: string) => get(url).then((res) => res.data as Mahasiswa)
    )

    const [ok, setOk] = useState(false)
    const [nama, setNama] = useState("")
    const [nim, setNim] = useState("")
    const [jurusan, setJurusan] = useState("")

    useEffect(() => {
        if (data) {
            setNama(data.nama || "")
            setNim(data.nim || "")
            setJurusan(data.jurusan || "")
        }
    }, [data])

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        const data = {
            nama,
            nim,
            jurusan,
            updatedAt: new Date().toISOString(),
        }

        e.preventDefault()
        let response = await put(
            "http://localhost:8080/api/mahasiswa/" + mahasiswaId,
            data
        )
        setOk(response.ok)
        console.log(response)

        setNama("")
        setNim("")
        setJurusan("")
        mutate()
        await message("Berhasil mengedit mahasiswa!")
    }

    return (
        <div className="max-w-4xl px-4 lg:px-0 py-8 mx-auto">
            <Nav />
            <h1 className="text-3xl font-semibold tracking-wider">
                Edit mahasiswa: {data?.nama}
            </h1>
            {ok && (
                <div>
                    Berhasil mengedit mahasiswa {nama}!{" "}
                    <Link className="font-bold" to="/">
                        Kembali
                    </Link>
                    .
                </div>
            )}
            <form onSubmit={submitForm}>
                <div className="">
                    <label htmlFor="nama">Nama*</label>
                    <input
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        type="text"
                        name="nama"
                        id="nama"
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="nim">NIM</label>
                    <input
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        type="number"
                        name="nim"
                        id="nim"
                    />
                </div>
                <div className="">
                    <label htmlFor="jurusan">Jurusan*</label>
                    <input
                        value={jurusan}
                        onChange={(e) => setJurusan(e.target.value)}
                        type="text"
                        name="jurusan"
                        id="jurusan"
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Edit"
                    className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                />
            </form>

            <Link
                to="/"
                className="px-4 py-2 mt-4 inline-block font-semibold rounded-md bg-amber-800 text-white uppercase tracking-wider"
            >
                Kembali
            </Link>
        </div>
    )
}
