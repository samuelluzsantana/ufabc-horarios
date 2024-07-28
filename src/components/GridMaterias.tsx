/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  ScrollShadow,
} from "@nextui-org/react";

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const disciplinesFromLocalStorage = localStorage.getItem("disciplines");

  const revalidateTime = 1300;

  const isSmallScreen = window.innerWidth < 450;

  const visibleColumns = [
    { id: "sigla", value: "Sigla" },
    { id: "nome", value: "Nome" },
    { id: "turma", value: "Turma" },
    { id: "periodo", value: "Periodo" },
    { id: "nome_campus", value: "Campus" },
    { id: "codigo", value: "Código" },
    { id: "vagas", value: "Vagas" },
  ];

  const defaultColumnsMobile = ["nome", "periodo"];
  const defaultColumnsWeb = [
    "sigla",
    "nome",
    "turma",
    "periodo",
    "nome_campus",
  ];

  const [selectedColumns, setSelectedColumns] = useState<string[]>(() => {
    const savedColumns = sessionStorage.getItem("selectedColumns");
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return isSmallScreen ? defaultColumnsMobile : defaultColumnsWeb;
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (selectedKeys: any) => {
    setSelectedColumns(selectedKeys);
    sessionStorage.setItem(
      "selectedColumns",
      JSON.stringify(Array.from(selectedKeys))
    );
  };

  const handleRowSelectionChange = (selectedRows: Set<number>) => {
    // Atualiza o estado com a lista de índices das disciplinas selecionadas
    const selectedIndexes = Array.from(selectedRows);
    setSelectedRows(selectedIndexes);

    // Atualiza a URL com os índices das disciplinas selecionadas, separados por `/`, mantendo a URL base
    const urlFragment = selectedIndexes.join(",");
    window.history.pushState({}, "", `/lista-disciplinas/#${urlFragment}`);
  };

  function verifySelecteds(valor: string): boolean {
    return !selectedKeys.has(valor);
  }

  async function listaTodasDisciplinas() {
    if (disciplinesFromLocalStorage) {
      setDisciplines(JSON.parse(disciplinesFromLocalStorage));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();

      // Atualizar diretamente o estado com os dados já formatados
      setDisciplines(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newSelectedColumns = isSmallScreen
        ? defaultColumnsMobile
        : defaultColumnsWeb;
      setSelectedColumns(newSelectedColumns);
      sessionStorage.setItem(
        "selectedColumns",
        JSON.stringify(newSelectedColumns)
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen, visibleColumns]);

  useEffect(() => {
    listaTodasDisciplinas();
    const interval = setInterval(listaTodasDisciplinas, revalidateTime * 1000); // Revalidate every hour
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stringDisciplines = JSON.stringify(disciplines);
    localStorage.setItem("disciplines", stringDisciplines);
  }, [disciplines]);

  return (
    <>
      {isLoading ? (
        <Progress
          size="sm"
          isIndeterminate
          classNames={{
            indicator: "bg-[#00007c]",
          }}
        />
      ) : (
        <ScrollShadow visibility={"bottom"}>
          <div className="overflow-x-auto">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="solid"
                  aria-label="Selecione colunas para exibir"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={selectedColumns}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
              >
                {visibleColumns.map((column) => (
                  <DropdownItem key={column.id}>{column.value}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div className="relative overflow-y-auto h-[30em]">
              <table className="min-w-full divide-y divide-foreground-200">
                <thead className="bg-foreground-100  sticky top-2 z-10 shadow-lg">
                  <tr>
                    {visibleColumns.map(
                      (column) =>
                        !verifySelecteds(column.id) && (
                          <th
                            key={column.id}
                            className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 `}
                          >
                            {column.value}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y text-center text-small font-normal divide-foreground-200">
                  {disciplines.map((course, index) => (
                    <tr
                      key={index}
                      className={`h-[5.5em] bg-opacity-50 transition-all ${
                        index % 2 === 0
                          ? "bg-foreground-50"
                          : "bg-foreground-100"
                      } hover:bg-gray-200 dark:hover:bg-gray-600`}
                      onClick={() =>
                        handleRowSelectionChange(
                          new Set([...selectedRows, course.id])
                        )
                      }
                    >
                      {visibleColumns.map(
                        (column) =>
                          !verifySelecteds(column.id) && (
                            <td key={column.id}>
                              {(course as any)[column.id]}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollShadow>
      )}
    </>
  );
}
