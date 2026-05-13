"use client";

import { useState } from "react";
import Button from "@/components/Commons/Button";
import Footer from "@/components/PageComponets/Footer";
import Header from "@/components/PageComponets/Header";
import ModalListaDisicplinas from "@/components/ModalListaDisciplinas";
import Calendar from "@/components/Calendar";
import Disciplinas from "@/components/Disciplinas/Index";
import { RiSearch2Fill } from "react-icons/ri";

export default function ListaDiciplinas() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header>
          <Button
            className="search-dicipline-button text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]"
            startContent={<RiSearch2Fill size={15} />}
            radius="sm"
            aria-label="Select Disciplines"
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
