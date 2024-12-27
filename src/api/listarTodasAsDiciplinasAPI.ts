"use server";

const URL_API_MATRICULA =
  "https://matricula.ufabc.edu.br/cache/todasDisciplinas.js";

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
      throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    const conteudoMatch = data.match(/todasDisciplinas=(\[.*\]);/);

    if (conteudoMatch === null) {
      throw new Error("Failed to match data");
    }

    const formatedData = conteudoMatch[1];
    const disciplines = JSON.parse(formatedData) as any[];

    // Map disciplines to the required format
    const formattedDisciplines = disciplines.map((discipline) => {
      // Regex para extrair nome do curso, turma e período
      const regex = /^(.*?)\s([A-Za-z0-9]+)-([A-Za-z]+)\s\((.*?)\)$/;
      const matches = discipline.nome.match(regex);
      if (matches) {
        const [, courseName, classIdentifier, period] = matches;
        const sigla = courseName
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase())
          .join("");

        return {
          id: discipline.id, // Adicionando o campo id
          nome: courseName.trim(),
          sigla: sigla.trim(), // Adicionando o campo sigla
          turma: classIdentifier.trim(),
          periodo: period.trim(),
          creditos: discipline.creditos,
          nome_campus: discipline.nome_campus.replace("Campus ", "").trim(),
          codigo: discipline.codigo,
          horarios: discipline.horarios.map(
            (horario: {
              periodicidade_extenso: any;
              horas: any;
              semana: any;
            }) => ({
              horas: horario.horas,
              semana: horario.semana,
              periodicidade_extenso: horario.periodicidade_extenso.replace(
                /[\s-]/g,
                ""
              ),
            })
          ),
          vagas: discipline.vagas,
          obrigatoriedades: discipline.obrigatoriedades.map(
            (item: { obrigatoriedade: any; curso_id: any }) => ({
              obrigatoriedade: item.obrigatoriedade,
              curso_id: item.curso_id,
            })
          ), // Adicionando o campo obrigatoriedades
        };
      } else {
        return null;
      }
    });

    const filteredDisciplines = formattedDisciplines.filter(
      (discipline) => discipline !== null
    ) as Discipline[];

    return filteredDisciplines;
  } catch (error) {
    throw error;
  }
}

export { listaTodasDisciplinasAPI };
