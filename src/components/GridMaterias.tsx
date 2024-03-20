"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import axios from "axios";
import {
  Button,
  Chip,
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

interface Course {
  nome: string;
  nome_campus: string;
  codigo: string;
  horarios: { horas: string[]; semana: number }[];
  vagas: number;
  periodo: string;
  turma: string;
}

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);

  async function listaTodasDisciplinas() {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();

      if (response && response.length > 0) {
        const formattedCourses = response.map((course: Course) => ({
          nome: course.nome,
          nome_campus: course.nome_campus, // Include nome_campus directly
          codigo: course.codigo,
          horarios: course.horarios,
          vagas: course.vagas,
          periodo: course.periodo,
          turma: course.turma,
        }));
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
  }, []); // Atualizar a lista quando a página mudar

  return (
    <>
      <ScrollShadow visibility={"bottom"} className="h-[30em]">
        <Table
          isStriped
          isHeaderSticky
          removeWrapper
          aria-label="Lista de Disciplinas"
          className="table-disciplinas"
        >
          <TableHeader className="mt-12 px-5">
            <TableColumn key="nome">Nome</TableColumn>
            <TableColumn key="turma">Turma</TableColumn>
            <TableColumn key="nome_campus">Campus</TableColumn>
            <TableColumn key="codigo">Código</TableColumn>
            <TableColumn key="horarios">Horários</TableColumn>
            <TableColumn key="vagas">Vagas</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Disciplinas ainda não carregadas."}>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.nome}</TableCell>
                <TableCell>{course.turma}</TableCell>
                <TableCell>{course.nome_campus}</TableCell>
                <TableCell>{course.codigo}</TableCell>
                <TableCell>
                  <ul>
                    {course.horarios.map((horario, idx) => (
                      <li key={idx}>
                        {getDayName(horario.semana)}: {horario.horas.join(", ")}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{course.vagas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollShadow>
    </>
  );
}
