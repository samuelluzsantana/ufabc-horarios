"use client";
// react
import { useEffect, useState } from "react";
// components
import Button from "@/components/Commons/Button";
import Footer from "@/components/PageComponets/Footer";
import Header from "@/components/PageComponets/Header";
import ModalListaDisicplinas from "@/components/ModalListaDisciplinas";
import Calendar from "@/components/Calendar";
import Disciplinas from "@/components/Disciplinas/Index";
// assets

import { RiSearch2Line } from "react-icons/ri";
import { setDisciplinasSelecionadas } from "@/store/store";

export default function ListaDiciplinas() {
  const [isHover, setIsHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const disciplinesFromLocalStorage = localStorage.getItem("disciplines")!;
    const disciplines = JSON.parse(disciplinesFromLocalStorage) as Discipline[];
    const url = new URL(window.location.href);
    const disciplinasParam = url.searchParams.get("disciplinas");

    if (disciplinasParam) {
      // Substitui ponto e vírgula por vírgula, se necessário
      const disciplinas = disciplinasParam
        .replace(/;/g, ",")
        .split(",")
        .map((id) => parseInt(id, 10));
      const selectedDisciplinas = disciplines.filter((d) =>
        disciplinas.includes(d.id)
      );
      setDisciplinasSelecionadas(selectedDisciplinas);
    }
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header isLogoHover={isHover || openModal}>
          <Button
            className={`search-dicipline-button text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]`}
            startContent={<RiSearch2Line size={15} />}
            radius="sm"
            aria-label="Select Disciplines"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onClick={() => setOpenModal(true)}
          >
            Selecionar Disciplinas
          </Button>
        </Header>

        <div className="w-full flex-grow flex flex-col items-center">
          <div className="w-full max-w-6xl px-4">
            <Calendar />
            <Disciplinas />
          </div>
        </div>
        <Footer />
      </main>

      <ModalListaDisicplinas
        isOpen={openModal}
        close={() => setOpenModal(false)}
      />
    </>
  );
}
