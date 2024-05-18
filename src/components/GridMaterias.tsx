/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import { Progress } from "@nextui-org/react"
import { getDayName } from "@/services/dayformats";

export default function GridMaterias() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const disciplinesFromLocalStorage = localStorage.getItem('disciplines')

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
    const stringDisciplines = JSON.stringify(disciplines);
    localStorage.setItem("disciplines", stringDisciplines);
  }, [disciplines]);

  return (
    <>
      {
        isLoading ?
          <Progress
            aria-label="Loading progress"
            size="sm"
            isIndeterminate
            classNames={{
              indicator: "bg-[#00007c]",
            }}
          />
          :
          <>
            <p>Tabela</p>
          </>
      }

    </>
  );
}