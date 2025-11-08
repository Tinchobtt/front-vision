import axios from 'axios'

export const testAPI = async (file) => {
    try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await axios.post("http://127.0.0.1:8000/load", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        console.log("✅ Respuesta del servidor:", response.data)
        return response.data
    } catch (error) {
        console.error("❌ Error al conectar con la API:", error.message)
        throw error
    }
}

export const predict = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/predict")

        console.log("✅ Respuesta del servidor:", response.data)
        return response.data
    } catch (error) {
        console.error("❌ Error al conectar con la API:", error.message)
        throw error
    }
}
