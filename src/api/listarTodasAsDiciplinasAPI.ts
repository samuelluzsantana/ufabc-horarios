"use server";

import axios from "axios";

const URL_API_MATRICULA =
  "https://matricula.ufabc.edu.br/cache/todasDisciplinas.js";

async function listaTodasDisciplinasAPI() {
  try {
    const { data } = await axios.get(URL_API_MATRICULA, {
      headers: {
        Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        Host: `matricula.ufabc.edu.br`,
        "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
      },
    });

    const conteudoMatch = data.match(/todasDisciplinas=(\[.*\]);/);
    const formatedData = conteudoMatch[1];

    return JSON.parse(formatedData);
  } catch (error) {
    throw error;
  }
}

export { listaTodasDisciplinasAPI };
