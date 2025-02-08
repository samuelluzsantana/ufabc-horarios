import { create } from "zustand";

interface DisciplinaStore {
  listaDisciplinas: Discipline[];
  disciplinasSelecionadas: Discipline[]; // Agora armazena objetos completos
  setListaDisciplinas: (disciplinas: Discipline[]) => void;
  setDisciplinasSelecionadas: (disciplinas: Discipline[]) => void;
  toggleDisciplinaSelecionada: (disciplina: Discipline) => void; // Adiciona/remove uma disciplina
}

export const useDisciplinaStore = create<DisciplinaStore>((set) => ({
  listaDisciplinas: [],
  disciplinasSelecionadas: [], // Inicialmente, nenhuma disciplina está selecionada
  setListaDisciplinas: (disciplinas) => set({ listaDisciplinas: disciplinas }),
  setDisciplinasSelecionadas: (disciplinas) =>
    set({ disciplinasSelecionadas: disciplinas }),
  toggleDisciplinaSelecionada: (disciplina) =>
    set((state) => {
      const updatedSelecionadas = state.disciplinasSelecionadas.some(
        (d) => d.id === disciplina.id
      )
        ? state.disciplinasSelecionadas.filter((d) => d.id !== disciplina.id) // Remove a disciplina
        : [...state.disciplinasSelecionadas, disciplina]; // Adiciona a disciplina
      return { disciplinasSelecionadas: updatedSelecionadas };
    }),
}));

// Hook para acessar a lista de disciplinas
export const useDisciplinas = () =>
  useDisciplinaStore((state) => state.listaDisciplinas);

// Hook para acessar as disciplinas selecionadas
export const useDisciplinasSelecionadas = () =>
  useDisciplinaStore((state) => state.disciplinasSelecionadas);

// Função para atualizar a lista de disciplinas
export const setDisciplinas = (disciplinas: Discipline[]) => {
  useDisciplinaStore.setState({ listaDisciplinas: disciplinas });
};

// Função para atualizar as disciplinas selecionadas
export const setDisciplinasSelecionadas = (disciplinas: Discipline[]) => {
  useDisciplinaStore.setState({ disciplinasSelecionadas: disciplinas });
};

// Função para adicionar/remover uma disciplina selecionada
export const toggleDisciplinaSelecionada = (disciplina: Discipline) => {
  useDisciplinaStore.getState().toggleDisciplinaSelecionada(disciplina);
};
