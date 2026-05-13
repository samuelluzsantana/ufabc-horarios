/**
 * Paleta de cores compartilhada para disciplinas.
 * Usada pelo calendário e pela lista de disciplinas selecionadas.
 */
export const DISCIPLINE_COLORS = [
  "#780000",
  "#c1121f",
  "#ffb521",
  "#003049",
  "#669bbc",
  "#00007c",
];

export const getColorByIndex = (index: number) =>
  DISCIPLINE_COLORS[index % DISCIPLINE_COLORS.length];
