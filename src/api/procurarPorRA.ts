import axios from "axios";

const URL_API_MINHAGRADE = 'https://minhagrade-ufabc.up.railway.app/'

async function listasDisciplinasporRA(ra: string) {

    const url = URL_API_MINHAGRADE+ '?ra=' + ra;
    
    try {
        const response = await axios.get(URL_API_MINHAGRADE + '?ra=' + ra);
        console.log(response);

        return response;
    } catch (error: any) {
        throw error
    }
}

export { listasDisciplinasporRA }