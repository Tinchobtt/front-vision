import axios from 'axios'

export const testAPI = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/')
        console.log('✅ Respuesta del servidor:', response.data)
        return response.data
    } catch (error) {
        console.error('❌ Error al conectar con la API:', error.message)
        throw error
    }
}