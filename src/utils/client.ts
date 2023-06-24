import { getClient, ResponseType } from "@tauri-apps/api/http"
import Mahasiswa from "../types/mahasiswa"

const client = await getClient()

export async function get(url: string) {
    const response = await client.get(url, {
        timeout: 30,
        responseType: ResponseType.JSON,
    })
    return response
}

export async function post(url: string, body: Mahasiswa) {
    const response = await client.post(url, {
        payload: body,
        type: "Json",
    })
    return response
}

export async function deleteData(url: string) {
    const response = await client.delete(url)
    return response
}

export async function put(url: string, body: Mahasiswa) {
    const response = await client.put(url, {
        payload: body,
        type: "Json",
    })
    return response
}
