import axios from "axios";

const URL_API_MATRICULA = 'https://matricula.ufabc.edu.br/cache/todasDisciplinas.js';

async function listaTodasDisciplinasAPI() {
  try {
    const response = await axios.get(URL_API_MATRICULA);
    const data = response.data;

    console.log("Dados das disciplinas:", data);
    return data;
  } catch (error) {
    console.error("Erro ao obter disciplinas:", error);
    throw error;
  }
}

export { listaTodasDisciplinasAPI };
