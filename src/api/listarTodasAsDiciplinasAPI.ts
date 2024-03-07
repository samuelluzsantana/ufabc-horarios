import axios from "axios";
import puppeteer from "puppeteer";

const URL_API_MATRICULA =
  "https://matricula.ufabc.edu.br/cache/todasDisciplinas.js";

async function listaTodasDisciplinasAPI() {
  
    console.log(URL_API_MATRICULA);
    
}

export { listaTodasDisciplinasAPI };
