interface Discipline {
  id: number;
  nome: string;
  turma: string;
  sigla: string;
  creditos: string;
  periodo: string;
  nome_campus: string;
  codigo: string;
  horarios: {
    horas: string[];
    semana: number;
    periodicidade_extenso: string;
  }[];
  vagas: number;
  obrigatoriedades: { obrigatoriedade: string; curso_id: number }[];
}
