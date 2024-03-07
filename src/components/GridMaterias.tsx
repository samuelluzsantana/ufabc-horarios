'use client'

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseName, setCourseName] = useState<string>("");

  async function listaTodasDisciplinas() {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();
      if (response && response.length > 0) {
        const firstCourseName = response[0].nome;
        setCourseName(firstCourseName);
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
      {!isLoading && (
        <div className="">
          <p>nome do curso: </p>
          <p className="font-semibold">{courseName}</p>
        </div>
      )}
    </>
  );
}
