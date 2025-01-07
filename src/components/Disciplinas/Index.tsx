import React from "react";
import { getDisciplinasSelecionadas } from "@/services/materiasSelecionadas";
import { Chip, Divider } from "@nextui-org/react";

export default function Disciplinas() {
  const disciplinas = getDisciplinasSelecionadas();

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

  return (
    <div className="container-materias-selecionadas w-full ml-4">
      <div className="flex flex-col w-full my-[8em]">
        <div className="materias-selecionadas grid grid-cols-1 gap-2 w-full">
          {disciplinas.map((disciplina, index) => (
            <div key={disciplina.id}>
              <div className="flex justify-between">
                <div className="text-lg">{disciplina.nome}</div>

                <div className="flex gap-2">
                  <Chip variant="flat" size="sm">
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
                    {disciplina.nome_campus}
                  </Chip>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
