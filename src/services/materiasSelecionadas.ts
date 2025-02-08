export function getDisciplinasSelecionadas(
  listaDisciplinas: Discipline[]
): Discipline[] {
  if (typeof window !== "undefined") {
    // Recupera as disciplinas do localStorage
    const listaDisciplinas = JSON.parse(
      localStorage.getItem("disciplines") || "[]"
    ) as Discipline[];

    // Recupera os IDs das disciplinas selecionadas da URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDisciplinesIds =
      urlParams
        .get("disciplinas")
        ?.split(/[, %2C]+/)
        .map((id) => parseInt(id, 10)) || [];

    // Ordena as disciplinas e os IDs para usar a técnica de dois ponteiros
    listaDisciplinas.sort((a, b) => a.id - b.id);
    selectedDisciplinesIds.sort((a, b) => a - b);

    const disciplinasSelecionadas: Discipline[] = [];
    let i = 0; // Ponteiro para a lista de disciplinas
    let j = 0; // Ponteiro para a lista de IDs selecionados

    // Aplica a técnica de dois ponteiros para encontrar as disciplinas correspondentes
    while (i < listaDisciplinas.length && j < selectedDisciplinesIds.length) {
      const disciplina = listaDisciplinas[i];
      const idSelecionado = selectedDisciplinesIds[j];

      if (disciplina.id === idSelecionado) {
        disciplinasSelecionadas.push(disciplina);
        i++;
        j++;
      } else if (disciplina.id < idSelecionado) {
        i++;
      } else {
        j++;
      }
    }

    return disciplinasSelecionadas;
  }

  return []; // Retorna um array vazio se não estiver no lado do cliente
}
