import dayjs from "dayjs";

const getDayName = (dayCode: number): string => {
  switch (dayCode) {
    case 1:
      return "Segunda-feira";
    case 2:
      return "Terça-feira";
    case 3:
      return "Quarta-feira";
    case 4:
      return "Quinta-feira";
    case 5:
      return "Sexta-feira";
    default:
      return "";
  }
};

const diaAtual = dayjs();
const inicioSemana = diaAtual.startOf("week");

const diasSemana = Array.from({ length: 7 }, (_, i) => ({
  dia: inicioSemana.add(i, "day"),
  nome: ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"][
    i
  ],
}));

// Uso: diasSemana[1].dia // segunda-feira

export { getDayName, diasSemana };
