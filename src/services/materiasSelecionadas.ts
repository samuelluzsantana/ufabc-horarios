export function getDisciplinasSelecionadas(): Discipline[] {
  if (typeof window !== "undefined") {
    // Recupera as disciplinas do localStorage
    const disciplinesFromLocalStorage = JSON.parse(
      localStorage.getItem("disciplines") || "[]"
    ) as Discipline[];

    // Recupera os IDs das disciplinas selecionadas da URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDisciplinesIds =
      urlParams
        .get("disciplinas")
        ?.split(/[, %2C]+/)
        .map((id) => parseInt(id, 10)) || [];

    // Filtra as disciplinas do localStorage que correspondem aos IDs da URL
    const disciplinasSelecionadas = disciplinesFromLocalStorage.filter(
      (disciplina) => selectedDisciplinesIds.includes(disciplina.id)
    );

    return disciplinasSelecionadas;
  }

  return []; // Retorna um array vazio se não estiver no lado do cliente
}
