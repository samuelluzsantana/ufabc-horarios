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
  Spinner,
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

  const [selectedColumns, setSelectedColumns] = useState(
    isSmallScreen
      ? ["nome", "periodo"]
      : visibleColumns.map((column) => column.id)
  );

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (selectedKeys: any) => {
    setSelectedColumns(selectedKeys);
  };

  const handleRowSelectionChange = (selectedRows: any) => {
    setSelectedRows(selectedRows);
    console.log(selectedRows);
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
      const formattedDisciplines = response.map((course: Discipline) => ({
        nome: course.nome,
        sigla: course.sigla,
        nome_campus: course.nome_campus, // Include nome_campus directly
        codigo: course.codigo,
        horarios: course.horarios,
        vagas: course.vagas,
        periodo: course.periodo,
        turma: course.turma,
      }));
      setDisciplines((prevCourses) => [
        ...prevCourses,
        ...formattedDisciplines,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setSelectedColumns(
        isSmallScreen
          ? ["nome", "turma", "periodo"]
          : visibleColumns.map((column) => column.id)
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
        <ScrollShadow visibility={"bottom"} className="h-[30em]">
          <div className="overflow-x-auto">
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" variant="flat">
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
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="">
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("sigla") ? "hidden" : ""
                    }`}
                  >
                    Sigla
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("nome") ? "hidden" : ""
                    }`}
                  >
                    Nome
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("turma") ? "hidden" : ""
                    }`}
                  >
                    Turma
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("periodo") ? "hidden" : ""
                    }`}
                  >
                    Periodo
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("nome_campus") ? "hidden" : ""
                    }`}
                  >
                    Campus
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("codigo") ? "hidden" : ""
                    }`}
                  >
                    Código
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 ${
                      verifySelecteds("vagas") ? "hidden" : ""
                    }`}
                  >
                    Vagas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {disciplines.map((course, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer ${
                      selectedRows.includes(course.sigla)
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                    onClick={() => handleRowSelectionChange([course.sigla])}
                  >
                    <td
                      className={`${verifySelecteds("sigla") ? "hidden" : ""}`}
                    >
                      {course.sigla}
                    </td>
                    <td
                      className={`${verifySelecteds("nome") ? "hidden" : ""}`}
                    >
                      {course.nome}
                    </td>
                    <td
                      className={`${verifySelecteds("turma") ? "hidden" : ""}`}
                    >
                      {course.turma}
                    </td>
                    <td
                      className={`${
                        verifySelecteds("periodo") ? "hidden" : ""
                      }`}
                    >
                      {course.periodo}
                    </td>
                    <td
                      className={`${
                        verifySelecteds("nome_campus") ? "hidden" : ""
                      }`}
                    >
                      {course.nome_campus}
                    </td>
                    <td
                      className={`${verifySelecteds("codigo") ? "hidden" : ""}`}
                    >
                      {course.codigo}
                    </td>
                    <td
                      className={`${verifySelecteds("vagas") ? "hidden" : ""}`}
                    >
                      {course.vagas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollShadow>
      )}
    </>
  );
}
