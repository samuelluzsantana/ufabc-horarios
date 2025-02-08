"use client";

import Footer from "@/components/PageComponets/Footer";
import Header from "@/components/PageComponets/Header";

import { useState } from "react";
import { ArrowLeft as ISearch } from "iconsax-react";
import { useRouter } from "next/navigation";
import { beta } from "../config";
import { Alert, Button } from "@heroui/react";

// react
export default function Sobre() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header isLogoHover={isHover}>
          <Button
            className={`search-dicipline-button text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]`}
            radius="sm"
            aria-label="Select Disciplines"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onClick={() => {
              router.replace("/lista-disciplinas");
            }}
          >
            inicio
          </Button>
        </Header>

        <div className="w-full flex-grow flex flex-col items-center">
          <div className="w-full max-w-6xl px-4">
            <h2 className="text-2xl font-bold my-4">
              O que é o UFABC-Horários?
            </h2>
            <p className="text-base leading-6">
              O <strong>UFABC-Horários</strong> é uma ferramenta criada para
              facilitar a organização dos estudantes da Universidade Federal do
              ABC
              <span className="mx-2">
                <a
                  href="https://www.ufabc.edu.br/"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  (UFABC)
                </a>
              </span>
              em relação aos horários das disciplinas e à gestão do tempo
              acadêmico.
            </p>

            <h3 className="text-xl font-semibold mt-6">
              Objetivos Principais:
            </h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>Organização Visual:</strong> Apresenta uma interface
                intuitiva para que os alunos possam visualizar seus horários de
                aula de forma clara e organizada, evitando conflitos entre
                disciplinas.
              </li>
              <li>
                <strong>Personalização:</strong> Permite que os usuários
                selecionem suas disciplinas, horários e campus, ajustando a
                grade conforme suas necessidades.
              </li>
              <li>
                <strong>Eficiência no Planejamento:</strong> Facilita o
                planejamento semanal ao integrar informações sobre disciplinas
                obrigatórias e optativas, auxiliando na escolha de aulas de
                acordo com as preferências e prioridades do aluno.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">
              Funcionalidades Gerais:
            </h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>Montagem de Horários:</strong> Possibilita adicionar
                disciplinas e horários manualmente ou com base nos códigos
                fornecidos pela universidade.
              </li>
              <li>
                <strong>Atualizações Frequentes:</strong> Reflete as
                atualizações mais recentes do sistema de matrículas da UFABC.
              </li>
              <li>
                <strong>Compatibilidade com Outras Ferramentas:</strong>{" "}
                Exportação de horários para calendários digitais como Google
                Agenda.
              </li>
              <li>
                <strong>Consulta Rápida de Disciplinas:</strong> Permite
                verificar informações básicas, como código, professor
                responsável e carga horária.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">
              Benefícios para os Estudantes:
            </h3>
            <p className="text-base leading-6">
              Redução de erros no momento de planejar a grade horária. Maior
              controle sobre compromissos acadêmicos, permitindo encaixar
              atividades extracurriculares ou trabalho. Simplicidade e
              praticidade, otimizando o tempo que seria gasto em ferramentas
              menos especializadas.
            </p>

            <p className="text-base leading-6 mt-4">
              O <strong>UFABC-Horários</strong> é uma ferramenta indispensável
              para estudantes que desejam conciliar sua vida acadêmica com
              outras responsabilidades, maximizando sua produtividade e
              organização.
            </p>

            {beta && (
              <div className="flex w-full justify-center my-8">
                <div className="flex items-center justify-center w-full">
                  <Alert
                    hideIconWrapper
                    description={
                      <span>
                        Saiba mais em{" "}
                        <a
                          href="/change-log"
                          className="text-blue-600 hover:underline"
                        >
                          /change-log
                        </a>
                      </span>
                    }
                    title={`Atualmente o UFABC-HORARIOS está em beta  ʕ•ᴥ•ʔ `}
                    variant="bordered"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
