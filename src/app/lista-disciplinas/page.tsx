"use client";
// react
import { useState } from "react";
// components
import Button from "@/components/Commons/Button";
import Footer from "@/components/PageComponets/Footer";
import Header from "@/components/Header";
import ModalListaDisicplinas from "@/components/lista-diciplinas/ModalListaDisciplinas";
// assets
import { SearchNormal as ISearch } from "iconsax-react";
// import { PiMagnifyingGlass } from "react-icons/pi";


export default function ListaDiciplinas() {
  const [isHover, setIsHover] = useState(false);
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Header isLogoHover={isHover}>
          <Button
            className={`search-dicipline-button text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]`}
            startContent={<ISearch variant="Bold" size={15} />}
            radius="sm"
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

        <div className="w-full flex flex-col items-center"></div>
        <Footer />
      </main>

      <ModalListaDisicplinas 
        isOpen={openModal} 
        close={() => setOpenModal(false) }
        />
    </>
  );
}
