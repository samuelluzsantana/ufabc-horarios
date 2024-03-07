import axios from "axios";

const URL_API_MATRICULA = 'https://matricula.ufabc.edu.br/cache/todasDisciplinas.js';

async function todasDisciplinasPagina() {
  const response = await fetch(URL_API_MATRICULA)
  const html = await response.text
  return html
}

export { todasDisciplinasPagina };
