/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ScrollShadow,
  Selection,
} from "@nextui-org/react";

import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";

interface Discipline {
  id: number;
  nome: string;
  turma: string;
  sigla: string;
  creditos: string;
  periodo: string;
  nome_campus: string;
  codigo: string;
  horarios: { horas: string[]; semana: number }[];
  vagas: number;
  obrigatoriedades: { obrigatoriedade: string; curso_id: number }[];
}

export default function GridMaterias() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const disciplinesFromLocalStorage = localStorage.getItem("disciplines")!;
  const [disciplines, setDisciplines] = useState<Discipline[]>(JSON.parse(disciplinesFromLocalStorage));
  
  
  


  const [selectedCampus, setSelectedCampus] = useState<string[]>([
    "Santo André",
    "São Bernardo do Campo",
  ]);
  const [selectedPeriod, setSelectedPeriod] = useState<string[]>([
    "Diurno",
    "Noturno",
  ]);



  const isSmallScreen = window.innerWidth < 450;

  const visibleColumns = [
    { id: "sigla", value: "Sigla" },
    { id: "nome", value: "Nome" },
    { id: "turma", value: "Turma" },
    { id: "periodo", value: "Periodo" },
    { id: "nome_campus", value: "Campus" },
    { id: "codigo", value: "Código" },
    { id: "vagas", value: "Vagas" },
  ];

  const defaultColumnsMobile = ["nome", "periodo"];
  const defaultColumnsWeb = [
    "sigla",
    "nome",
    "turma",
    "periodo",
    "nome_campus",
  ];

  const [selectedColumns, setSelectedColumns] = useState<string[]>(() => {
    const savedColumns = sessionStorage.getItem("selectedColumns");
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return isSmallScreen ? defaultColumnsMobile : defaultColumnsWeb;
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (keys: Selection) => {
    // Convert each Key to a string
    const updatedColumns = Array.from(keys).map((key) => key.toString());

    setSelectedColumns(updatedColumns); // Now safe to update state
    sessionStorage.setItem("selectedColumns", JSON.stringify(updatedColumns));
  };

  const handleRowSelectionChange = (selectedRows: Set<number>) => {
    const selectedIndexes = Array.from(selectedRows);
    setSelectedRows(selectedIndexes);

    const urlFragment = selectedIndexes.join(",");
    sessionStorage.setItem("selectedDisciplines", JSON.stringify(urlFragment));
  };

  const handleCampusSelectionChange = (keys: "all" | Set<React.Key>) => {
    const newSelectedCampus = Array.from(keys);
    if (newSelectedCampus.length > 0) {
      setSelectedCampus(newSelectedCampus as string[]);
    }
  };

  const handlePeriodSelectionChange = (keys: "all" | Set<React.Key>) => {
    const newSelectedPeriod = Array.from(keys);
    if (newSelectedPeriod.length > 0) {
      setSelectedPeriod(newSelectedPeriod as string[]);
    }
  };

  function verifySelecteds(valor: string): boolean {
    return !selectedKeys.has(valor);
  }

  async function listaTodasDisciplinas() {
    setIsLoading(true);
    try {
      const response = await listaTodasDisciplinasAPI();
      setDisciplines(response);   
      localStorage.setItem("disciplines", JSON.stringify(response));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newSelectedColumns = isSmallScreen
        ? defaultColumnsMobile
        : defaultColumnsWeb;
      setSelectedColumns(newSelectedColumns);
      sessionStorage.setItem(
        "selectedColumns",
        JSON.stringify(newSelectedColumns)
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen, visibleColumns]);


  


  useEffect(() => {
    if (!disciplinesFromLocalStorage) {
      listaTodasDisciplinas();
    }


    setDisciplines(JSON.parse(disciplinesFromLocalStorage) )
  }, []);

  const filteredDisciplines =  disciplines?.filter(
    (discipline: { nome_campus: string; periodo: string; }) =>
      selectedCampus.includes(discipline.nome_campus) &&
      selectedPeriod.includes(discipline.periodo)
  );
  

  const FiltrarPeriodo = () => {
    return (
      <>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="light"
              aria-label="Selecione o período"
              className="w-full text-md"
            >
              Período
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectedKeys={new Set(selectedPeriod)}
            selectionMode="multiple"
            onSelectionChange={handlePeriodSelectionChange}
          >
            <DropdownItem key="Diurno">Diurno</DropdownItem>
            <DropdownItem key="Noturno">Noturno</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );
  };

  const FiltrarCampus = () => {
    return (
      <>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="light"
              aria-label="Selecione o campus"
              className="w-full text-md"
            >
              Campus
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            selectedKeys={new Set(selectedCampus)}
            selectionMode="multiple"
            onSelectionChange={handleCampusSelectionChange}
            closeOnSelect={false}
          >
            <DropdownItem key="Santo André">Santo André</DropdownItem>
            <DropdownItem key="São Bernardo do Campo">
              São Bernardo do Campo
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );
  };


  const Colunas = () => {
    return(

      <>
      <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="light"
                    className="w-full text-md"
                    aria-label="Selecione colunas para exibir"
                  >
                    Colunas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  closeOnSelect={false}
                  selectedKeys={new Set(selectedColumns)}
                  selectionMode="multiple"
                  onSelectionChange={handleSelectionChange}
                  disallowEmptySelection
                >
                  {visibleColumns.map((column) => (
                    <DropdownItem key={column.id}>{column.value}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
      
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        <Progress
          size="sm"
          isIndeterminate
          classNames={{
            indicator: "bg-[#00007c]",
          }}
        />
      ) : (
        <ScrollShadow visibility={"bottom"}>
          <div className="overflow-x-auto">
            <div className="pesquisar-texto mb-8">
              <div className="flex justify-between items-center">
                <Input
                  variant="bordered"
                  placeholder="Digite"
                  size="lg"
                  className="bg-foreground-200 rounded-medium border-default-200 focus:border-[#00007c]"
                  startContent={
                    <>
                      <IoSearchOutline size={15} />
                    </>
                  }
                />

                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <Button
                      size="sm"
                      variant="solid"
                      aria-label="Selecione os Filtros"
                      className="ml-4 w-[5.5em] h-[4.5em] md:w-[4.5em] rounded-medium bg-[#00007c] text-white"
                      isIconOnly
                    >
                      <IoFilterOutline size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col space-y-4 p-2">
                      <FiltrarCampus />
                      <FiltrarPeriodo />
                      <Colunas/>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>


            <div className="relative overflow-y-auto h-[35em]">
              <table className="min-w-full divide-y divide-foreground-200">
                <thead >
                  <tr className="bg-foreground-100 sticky top-1 z-10 shadow-lg">
                    {visibleColumns.map(
                      (column) =>
                        !verifySelecteds(column.id) && (
                          <th
                            key={column.id}
                            className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300`}
                          >
                            {column.value}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y text-center text-small font-normal divide-foreground-200">
                  {filteredDisciplines?.map((course, index) => (
                    <tr
                      key={index}
                      className={`h-[5.5em] bg-opacity-50 transition-all ${
                        index % 2 === 0
                          ? "bg-foreground-50"
                          : "bg-foreground-100"
                      } hover:bg-gray-200 dark:hover:bg-gray-600`}
                      onClick={() =>
                        handleRowSelectionChange(
                          new Set([...selectedRows, course.id])
                        )
                      }
                    >
                      {visibleColumns.map(
                        (column) =>
                          !verifySelecteds(column.id) && (
                            <td key={column.id}>
                              {(course as any)[column.id]}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollShadow>
      )}
    </>
  );
}
