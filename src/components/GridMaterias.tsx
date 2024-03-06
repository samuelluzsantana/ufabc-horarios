import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinas";

export default function GridMaterias() {

    async function listaTodasDisciplinas() {
    try {
      const response = await listaTodasDisciplinasAPI();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      <p onClick={() => listaTodasDisciplinas()}>Grid</p>
    </>
  );
}
