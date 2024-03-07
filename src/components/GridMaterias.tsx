import { useRouter } from "next/router";

export default function GridMaterias() {
  const URL = window.location.origin;

  async function listaTodasDisciplinas() {
    console.log(URL);
  }

  return (
    <>
      <p onClick={() => listaTodasDisciplinas()}>Grid</p>
    </>
  );
}
