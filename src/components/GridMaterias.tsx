"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import axios from "axios";
import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

interface Course {
  nome: string;
  campus: number;
  codigo: string;
  horarios: { horas: string[]; semana: number }[];
  vagas: number;
}

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState<number>(1); // Página atual
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicador de mais itens a carregar

  async function listaTodasDisciplinas(page: number) {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();
      if (response && response.length > 0) {
        const formattedCourses = response.map((course: Course) => ({
          nome: course.nome,
          campus: course.campus,
          codigo: course.codigo,
          horarios: course.horarios,
          vagas: course.vagas
        }));
        setCourses(prevCourses => [...prevCourses, ...formattedCourses]);
      } else {
        setHasMore(false); // Se não houver mais itens a carregar, definir hasMore como false
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listaTodasDisciplinas(page);
  }, [page]); // Atualizar a lista quando a página mudar

  const getCampusName = (campusCode: number): string => {
    return campusCode === 1 ? "Santo André" : "São Bernardo";
  };

  const getDayName = (dayCode: number): string => {
    switch (dayCode) {
      case 1:
        return "Segunda-feira";
      case 2:
        return "Terça-feira";
      case 3:
        return "Quarta-feira";
      case 4:
        return "Quinta-feira";
      case 5:
        return "Sexta-feira";
      default:
        return "";
    }
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1); // Carregar a próxima página quando o usuário chegar ao final da lista
    }
  };

  return (
    <>
      <Button onClick={() => listaTodasDisciplinas(1)}>Listar Disciplinas</Button>
      {!isLoading && (
        <div className="">
          <Table isHeaderSticky removeWrapper  aria-label="Lista de Disciplinas">
            <TableHeader>
              <TableColumn key="nome">Nome</TableColumn>
              <TableColumn key="campus">Campus</TableColumn>
              <TableColumn key="codigo">Código</TableColumn>
              <TableColumn key="horarios">Horários</TableColumn>
              <TableColumn key="vagas">Vagas</TableColumn>
            </TableHeader>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.nome}</TableCell>
                  <TableCell>{getCampusName(course.campus)}</TableCell>
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
          {isLoading && (
            <div className="flex justify-center mt-4">
              <Spinner color="primary" />
            </div>
          )}
          {!isLoading && hasMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore}>Carregar Mais</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
