import axios from "axios";

const URL_API_MINHAGRADE = 'https://minhagrade-ufabc.up.railway.app/'

async function listaTodasDisciplinasAPI() {
    try {
        const response = await axios.get(URL_API_MINHAGRADE);
        console.log(response);
        return response;
    } catch (error: any) {
        throw error
    }
}

export { listaTodasDisciplinasAPI }