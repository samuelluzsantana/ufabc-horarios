export function getDisciplinasSelecionadas(): Discipline[] {
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
