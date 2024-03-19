"use server";

import puppeteer from "puppeteer";

const URL_API_MATRICULA = "https://matricula.ufabc.edu.br/cache/todasDisciplinas.js";

async function listaTodasDisciplinasAPI() {


  console.log('alo');
  
  


  try {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(URL_API_MATRICULA);

    const data = await page.evaluate(() => {
      const preElement = document.querySelector("pre");

      if (preElement && preElement.textContent !== null) {
        const preContent = preElement.textContent.trim();
        const conteudoMatch = preContent.match(/todasDisciplinas=(\[.*\]);/);

        if (conteudoMatch && conteudoMatch[1]) {
          return conteudoMatch[1];
        }
      }

      return null;
    });
    if (data !== null) {
      await browser.close();
      return JSON.parse(data);
    } else {
      throw new Error("Failed to extract data from the page.");
    }
  } catch (error) {
    throw error;
  }
}

export { listaTodasDisciplinasAPI };
