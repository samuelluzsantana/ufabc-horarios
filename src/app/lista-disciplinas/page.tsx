"use client";
// react
import { useState } from "react";
// components
import Button from "@/components/Commons/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalListaDisicplinas from "@/components/lista-diciplinas/ModalListaDisciplinas";
// assets
import { SearchNormal as ISearch } from "iconsax-react";

export default function ListaDiciplinas() {
  const [isHover, setIsHover] = useState(false);

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
          >
            Selecionar Disciplinas
          </Button>
        </Header>

        <div className="w-full flex flex-col items-center"></div>
        <Footer />
      </main>

      {/* <ModalListaDisicplinas 
        isOpen={} 
        close={ }
        /> */}
    </>
  );
}
