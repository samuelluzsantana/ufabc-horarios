"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import axios from "axios";
import { Button, Chip } from "@nextui-org/react";

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

  async function listaTodasDisciplinas() {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();
      if (response && response.length > 0) {
        const formattedCourses = response.slice(0, 5).map((course: Course) => ({
          nome: course.nome,
          campus: course.campus,
          codigo: course.codigo,
          horarios: course.horarios,
          vagas: course.vagas
        }));
        setCourses(formattedCourses);
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

  return (
    <>
      <Button onClick={() => listaTodasDisciplinas()}>Listar Disciplinas</Button>
      {!isLoading && (
        <div className="">
          <p>Disciplinas:</p>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <p className="font-semibold">{course.nome}</p>
                <p>Campus: {getCampusName(course.campus)}</p>
                <p>Código: {course.codigo}</p>
                <p>Horários:</p>
                <ul>
                  {course.horarios.map((horario, idx) => (
                    <li key={idx}>
                      {getDayName(horario.semana)}: {horario.horas.join(', ')}
                    </li>
                  ))}
                </ul>
                <p>Vagas: {course.vagas}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
