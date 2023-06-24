import { useState } from "react"
import { Link } from "react-router-dom"
import Nav from "./Nav"
import { post } from "../utils/client"

export default function Daftar() {
    const [ok, setOk] = useState(false)
    const [nama, setNama] = useState("")
    const [nim, setNim] = useState("")
    const [jurusan, setJurusan] = useState("")

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        const data = { nama, nim, jurusan }

        e.preventDefault()
        let response = await post("http://localhost:8080/api/mahasiswa", data)
        setOk(response.ok)
        console.log(response)

        setNama("")
        setNim("")
        setJurusan("")
    }

    return (
        <div className="max-w-4xl px-4 lg:px-0 py-8 mx-auto">
            <Nav />
            <h1 className="text-3xl font-semibold tracking-wider">
                Daftar menjadi mahasiswa
            </h1>
            {ok && (
                <div>
                    Berhasil mendaftarkan mahasiswa baru!{" "}
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
                    value="Daftar Sekarang"
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
