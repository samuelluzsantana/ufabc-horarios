import { useRouter } from 'next/router';


export default function GridMaterias() {
  const router = useRouter();
  
  const URL = router.asPath;


  async function listaTodasDisciplinas() {
    console.log(URL);
  }

  return (
    <>
      <p onClick={() => listaTodasDisciplinas()}>Grid</p>
    </>
  );
}
