interface Discipline {
    nome: string;
    turma: string;
    sigla: string;
    periodo: string;
    nome_campus: string;
    codigo: string;
    horarios: { horas: string[]; semana: number }[];
    vagas: number;
}