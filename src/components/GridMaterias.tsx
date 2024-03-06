import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinas";

export default function GridMaterias() {

    async function listaTodasDisciplinas() {

        const url = 'https://matricula.ufabc.edu.br/cache/todasDisciplinas.js';


        try {
            const resposta = await fetch(url);
            const dados = await resposta.json();
    
            // Agora, dados contém as informações de todas as disciplinas
            console.log(dados);
    
            // Você pode realizar operações adicionais com os dados conforme necessário
        } catch (erro) {
            console.error('Erro ao obter as disciplinas:', erro);
        }
  }

  

  return (
    <>
      <p onClick={() => listaTodasDisciplinas()}>Grid</p>
    </>
  );
}
