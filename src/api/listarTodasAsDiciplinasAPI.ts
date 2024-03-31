"use server";

const URL_API_MATRICULA = "https://matricula.ufabc.edu.br/cache/todasDisciplinas.js";

async function listaTodasDisciplinasAPI(): Promise<Discipline[]> {
  try {
    const response = await fetch(URL_API_MATRICULA, {
      headers: {
        Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        Host: `matricula.ufabc.edu.br`,
        "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.text();

    const conteudoMatch = data.match(/todasDisciplinas=(\[.*\]);/);
    console.log(conteudoMatch);

    if (conteudoMatch === null) { throw new Error('Failed to match data');}
    const formatedData = conteudoMatch[1] ;
    const disciplines: Discipline[] = JSON.parse(formatedData);


    // Map disciplines to the required format
    const formattedDisciplines = disciplines.map(discipline => {
      const regex = /^(.*?)\s([A-Za-z0-9]+)-([A-Za-z]+)\s\((.*?)\)$/;
      const matches = discipline.nome.match(regex);
      if (matches) {
        const [, courseName, classIdentifier, period] = matches;
        const sigla = courseName.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        return {
          nome: courseName.trim(),
          sigla: sigla.trim(), // Adicionando o campo sigla
          turma: classIdentifier.trim(),
          periodo: period.trim(),
          nome_campus: discipline.nome_campus,
          codigo: discipline.codigo,
          horarios: discipline.horarios,
          vagas: discipline.vagas,
        };
      } else {
        return null;
      }
    });

    const filteredDisciplines = formattedDisciplines.filter(discipline => discipline !== null) as Discipline[];

    return filteredDisciplines;
  } catch (error) {
    throw error;
  }
}


export { listaTodasDisciplinasAPI };
