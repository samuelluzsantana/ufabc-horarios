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
      <Modal isOpen={isOpen} onOpenChange={close} backdrop="opaque" size="4xl">
        <ModalContent className="w-[120em] ">
          {(onClose) => (
            <>
              <div className="aling flex flex-col ">
                <ModalHeader className="flex flex-col gap-1 text-xl">
                  <p>Ola</p>
                </ModalHeader>

                <ModalBody></ModalBody>

                <ModalFooter>
                  <div className="w-full flex justify-center gap-4 mt-8">
                    <Button
                      color="primary"
                      variant="flat"
                      onKeyDown={onClose}
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>

                    <Button
                      className=" bg-slate-900 dark:bg-indigo-950 text-gray-100"
                      variant="solid"
                    >
                      Confirma
                    </Button>
                  </div>
                </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
