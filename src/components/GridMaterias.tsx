"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  ScrollShadow,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getDayName } from "@/services/dayformats";

export default function GridMaterias() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const disciplinesFromLocalStorage =  localStorage.getItem('disciplines')

  const revalidateTime = 1300;

  const isSmallScreen = window.innerWidth < 450;

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      ? ["nome", "turma", "periodo"]
      : visibleColumns.map((column) => column.id)
  );

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (selectedKeys: any) => {
    setSelectedColumns(selectedKeys);
  };

  function verifySelecteds(valor: string): boolean {
    return !selectedKeys.has(valor);
  }

  async function listaTodasDisciplinas() {
    if (disciplinesFromLocalStorage) {
      setDisciplines(JSON.parse(disciplinesFromLocalStorage));
      setIsLoading(false);
      return
    }
    
    setIsLoading(true);
    
    try {
      const response = await listaTodasDisciplinasAPI();
      const formattedDisciplines = response
        .map((course: Discipline) => ({
          nome: course.nome,
          sigla: course.sigla,
          nome_campus: course.nome_campus, // Include nome_campus directly
          codigo: course.codigo,
          horarios: course.horarios,
          vagas: course.vagas,
          periodo: course.periodo,
          turma: course.turma,
        }));
      setDisciplines((prevCourses) => [...prevCourses, ...formattedDisciplines]);
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
    const stringDisciplines =JSON.stringify(disciplines);
    localStorage.setItem("disciplines", stringDisciplines);
  }, [disciplines]);

  return (
    <>
      {
        isLoading ?
          <Progress
            size="sm"
            isIndeterminate
            classNames={{
              indicator: "bg-[#00007c]",
            }}
          />

          :
          <ScrollShadow visibility={"bottom"} className="h-[30em]">
            <Table
              isStriped
              isHeaderSticky
              removeWrapper
              aria-label="Lista de Disciplinas"
              className="table-disciplinas"
              topContent={
                <>
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
                </>
              }
            >
              <TableHeader className="px-5">
                <TableColumn hidden={verifySelecteds("sigla")} key="sigla">
                  Sigla
                </TableColumn>
                <TableColumn hidden={verifySelecteds("nome")} key="nome">
                  Nome
                </TableColumn>
                <TableColumn hidden={verifySelecteds("turma")} key="turma">
                  Turma
                </TableColumn>
                <TableColumn hidden={verifySelecteds("periodo")} key="periodo">
                  Periodo
                </TableColumn>
                <TableColumn
                  hidden={verifySelecteds("nome_campus")}
                  key="nome_campus"
                >
                  Campus
                </TableColumn>
                <TableColumn hidden={verifySelecteds("codigo")} key="codigo">
                  Código
                </TableColumn>

                <TableColumn hidden={verifySelecteds("vagas")} key="vagas">
                  Vagas
                </TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={!isLoading ? "Disciplinas não carregadas." : ''}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
              >
                {disciplines.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell hidden={verifySelecteds("sigla")}>
                      {course.sigla}
                    </TableCell>
                    <TableCell hidden={verifySelecteds("nome")}>
                      {course.nome}
                    </TableCell>
                    <TableCell hidden={verifySelecteds("turma")}>
                      {course.turma}
                    </TableCell>

                    <TableCell hidden={verifySelecteds("periodo")}>
                      {course.periodo}
                    </TableCell>

                    <TableCell hidden={verifySelecteds("nome_campus")}>
                      {course.nome_campus}
                    </TableCell>
                    <TableCell hidden={verifySelecteds("codigo")}>
                      {course.codigo}
                    </TableCell>

                    <TableCell hidden={verifySelecteds("vagas")}>
                      {course.vagas}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>
      }

    </>
  );
}
