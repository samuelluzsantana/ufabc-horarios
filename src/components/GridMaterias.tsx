"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import axios from "axios";

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseName, setCourseName] = useState<string>("");

  async function listaTodasDisciplinas() {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();
      if (response && response.length > 0) {
        const firstCourseName = response[2].nome;
        setCourseName(firstCourseName);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <button onClick={() => listaTodasDisciplinas()}>Oi</button>
      {!isLoading && (
        <div className="">
          <p>nome do curso: </p>
          <p className="font-semibold">{courseName}</p>
        </div>
      )}
    </>
  );
}

// const response = await axios.get("https://api.scraperapi.com/?api_key=9113c0af6e1ccc28de58ff2b12c99d02&url=https%3A%2F%2Fmatricula.ufabc.edu.br%2Fcache%2FtodasDisciplinas.js"
