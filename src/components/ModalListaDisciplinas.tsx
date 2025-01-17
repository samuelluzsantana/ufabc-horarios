import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import GridMaterias from "./GridMaterias";

interface ModalListaDisicplinasrprops {
  isOpen: boolean;
  close: () => void;
}

export default function ModalListaDisicplinas({
  isOpen,
  close,
}: ModalListaDisicplinasrprops) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={close}
        backdrop="opaque"
        size="5xl"
        placement="top"
        className="mx-[1em]"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="aling flex flex-col ">
                <ModalHeader className="flex flex-col gap-1 text-xl">
                  <p>Selecione suas disciplinas</p>
                </ModalHeader>

                <ModalBody>
                  <GridMaterias />
                </ModalBody>

                <ModalFooter></ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
