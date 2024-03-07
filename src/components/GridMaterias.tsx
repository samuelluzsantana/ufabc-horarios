import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState(true);

  async function listaTodasDisciplinas() {
    setIsLoading(true);

    try {
      const response = await listaTodasDisciplinasAPI();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
   
    listaTodasDisciplinas();
  }, []); 

  return <>{!isLoading && <p>grid</p>}</>;
}
