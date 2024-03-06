import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import GridMaterias from "../GridMaterias";

interface ModalListaDisicplinasrprops {
  isOpen: boolean;
  close: () => void;
}

export default function ModalListaDisicplinas({
  isOpen,
  close,
}: ModalListaDisicplinasrprops) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={close}
        backdrop="opaque"
        size="5xl"
        placement="top"
        className="mx-[1em] sm:top-[3em]"
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
