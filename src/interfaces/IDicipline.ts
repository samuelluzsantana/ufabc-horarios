interface Discipline {
  id: number;
  nome: string;
  turma: string;
  sigla: string;
  creditos: string;
  periodo: string;
  nome_campus: string;
  codigo: string;
  horarios: { horas: string[]; semana: number }[];
  vagas: number;
  obrigatoriedades: { obrigatoriedade: string; curso_id: number }[];
}
