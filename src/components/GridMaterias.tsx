"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import axios from "axios";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
  const [courses, setCourses] = useState<Discipline[]>([]);

  const [visibleColumns, setVisibleColumns] = useState([
    { id: "sigla", value: "Sigla" },
    { id: "nome", value: "Nome" },
    { id: "turma", value: "Turma" },
    { id: "periodo", value: "Periodo" },
    { id: "nome_campus", value: "Campus" },
    { id: "codigo", value: "Código" },
    { id: "horarios", value: "Horários" },
    { id: "vagas", value: "Vagas" },
  ]);

  const [selectedColumns, setSelectedColumns] = useState(
    visibleColumns.map((column) => column.id)
  );

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (selectedKeys) => {
    setSelectedColumns(selectedKeys);
  };

  function verificaSelecionado(valor: string): boolean {
    return !selectedKeys.has(valor);
  }

  async function listaTodasDisciplinas() {
    setIsLoading(true);
    try {
      const response = await listaTodasDisciplinasAPI();

      if (response && response.length > 0) {
        const formattedCourses = response
          .map((course: Discipline) => ({
            nome: course.nome,
            sigla: course.sigla,
            nome_campus: course.nome_campus, // Include nome_campus directly
            codigo: course.codigo,
            horarios: course.horarios,
            vagas: course.vagas,
            periodo: course.periodo,
            turma: course.turma,
          }))
          .slice(100, 120);
        setCourses((prevCourses) => [...prevCourses, ...formattedCourses]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listaTodasDisciplinas();
  }, []);

  return (
    <>
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
                    Columns
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
            <TableColumn hidden={verificaSelecionado("sigla")} key="sigla">
              Sigla
            </TableColumn>
            <TableColumn hidden={verificaSelecionado("nome")} key="nome">
              Nome
            </TableColumn>
            <TableColumn hidden={verificaSelecionado("turma")} key="turma">
              Turma
            </TableColumn>
            <TableColumn hidden={verificaSelecionado("periodo")} key="periodo">
              Periodo
            </TableColumn>
            <TableColumn
              hidden={verificaSelecionado("nome_campus")}
              key="nome_campus"
            >
              Campus
            </TableColumn>
            <TableColumn hidden={verificaSelecionado("codigo")} key="codigo">
              Código
            </TableColumn>
            <TableColumn
              hidden={verificaSelecionado("horarios")}
              key="horarios"
            >
              Horários
            </TableColumn>
            <TableColumn hidden={verificaSelecionado("vagas")} key="vagas">
              Vagas
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Disciplinas ainda não carregadas."}>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell hidden={verificaSelecionado("sigla")}>
                  {course.sigla}
                </TableCell>
                <TableCell hidden={verificaSelecionado("nome")}>
                  {course.nome}
                </TableCell>
                <TableCell hidden={verificaSelecionado("turma")}>
                  {course.turma}
                </TableCell>
                <TableCell hidden={verificaSelecionado("periodo")}>
                  {course.periodo}
                </TableCell>
                <TableCell hidden={verificaSelecionado("nome_campus")}>
                  {course.nome_campus}
                </TableCell>
                <TableCell hidden={verificaSelecionado("codigo")}>
                  {course.codigo}
                </TableCell>
                <TableCell hidden={verificaSelecionado("horarios")}>
                  <ul>
                    {course.horarios.map((horario, idx) => (
                      <li key={idx}>
                        {getDayName(horario.semana)}: {horario.horas.join(", ")}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell hidden={verificaSelecionado("vagas")}>
                  {course.vagas}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollShadow>
    </>
  );
}
