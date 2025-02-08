import React, { useState, useEffect } from "react";
import { Button, Chip, Divider } from "@heroui/react";
import { IoCloseCircle } from "react-icons/io5";
import {
  useDisciplinas,
  useDisciplinasSelecionadas,
  toggleDisciplinaSelecionada,
} from "@/store/store";

export default function Disciplinas() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    // Verifica o tamanho da tela apenas no lado do cliente
    setIsSmallScreen(window.innerWidth < 450);
  }, []);

  const listaDisciplinas: Discipline[] = useDisciplinas();
  const disciplinasSelecionadas = useDisciplinasSelecionadas();

  const colors = [
    "#780000",
    "#c1121f",
    "#ffb521",
    "#003049",
    "#669bbc",
    "#00007c",
  ];

  const getColorByIndex = (index: number): string => {
    return colors[index % colors.length];
  };

  const corSA = "#1a9c5c";
  const corSBC = "#500100";

  function removerDisciplina(disciplina: Discipline) {
    // Remove a disciplina do estado global
    toggleDisciplinaSelecionada(disciplina);

    // Atualiza a URL com as disciplinas selecionadas restantes
    const novasDisciplinas = disciplinasSelecionadas
      .filter((d) => d.id !== disciplina.id) // Filtra a disciplina removida
      .map((d) => d.id); // Extrai os IDs das disciplinas restantes

    const newUrl = novasDisciplinas.length
      ? `?disciplinas=${novasDisciplinas.join(",")}` // Cria a nova URL
      : ""; // Se não houver disciplinas, remove o parâmetro da URL

    // Atualiza a URL sem recarregar a página
    window.history.pushState({}, "", window.location.pathname + newUrl);
  }

  const getCampusName = (nomeCampus: string): string => {
    if (isSmallScreen) {
      return nomeCampus === "São Bernardo do Campo"
        ? "SBC"
        : nomeCampus === "Santo André"
          ? "SA"
          : nomeCampus;
    }
    return nomeCampus;
  };

  return (
    <div className="container-materias-selecionadas w-full">
      <div className="flex flex-col w-full my-[8em]">
        <div className="materias-selecionadas grid grid-cols-1 gap-2 w-full">
          {disciplinasSelecionadas.map((disciplina, index) => (
            <div key={disciplina.id}>
              <div className="flex justify-between">
                <div className="flex justify-center">
                  <div
                    style={{
                      height: "100%",
                      width: "0.35rem",
                      marginRight: "0.5rem",
                      borderRadius: "0.25rem",
                      backgroundColor: getColorByIndex(index),
                    }}
                  ></div>
                  {!isSmallScreen && (
                    <div className="text-lg">{disciplina.turma} - </div>
                  )}
                  <div className={isSmallScreen ? "text-sm" : "text-lg"}>
                    {disciplina.nome}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Chip
                    variant="flat"
                    size="sm"
                    style={{
                      backgroundColor:
                        disciplina.periodo.toLowerCase() === "diurno"
                          ? "#939393"
                          : "#373737",
                      color: "#FFF",
                    }}
                  >
                    {disciplina.periodo}
                  </Chip>

                  <Chip
                    variant="flat"
                    size="sm"
                    style={{
                      color: "#fff",
                      backgroundColor:
                        disciplina.nome_campus === "São Bernardo do Campo"
                          ? corSBC
                          : corSA,
                    }}
                  >
                    {getCampusName(disciplina.nome_campus)}
                  </Chip>

                  <Button isIconOnly size="sm" className="bg-transparent">
                    <IoCloseCircle
                      onClick={() => removerDisciplina(disciplina)}
                      className="text-opacity-35"
                      size={18}
                    />
                  </Button>
                </div>
              </div>
              <Divider className="mt-[0.5em]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
