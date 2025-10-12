/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { listaTodasDisciplinasAPI } from "@/api/listarTodasAsDiciplinasAPI";
import {
  Button,
  Checkbox,
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
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";

import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import router from "next/router";
import {
  removeDuplicatas,
  removeDuplicatasPorChave,
} from "@/services/removeDuplicates";
import {
  setDisciplinas,
  setDisciplinasSelecionadas,
  toggleDisciplinaSelecionada,
  useDisciplinasSelecionadas,
  useDisciplinaStore,
} from "@/store/store";
import { log } from "node:console";

export default function GridMaterias() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const disciplinesFromLocalStorage = localStorage.getItem("disciplines")!;
  const [disciplines, setDisciplines] = useState<Discipline[]>(
    JSON.parse(disciplinesFromLocalStorage)
  );

  const getFiltersFromSessionStorage = (): {
    campus: string[];
    periodo: string[];
  } => {
    const savedFilters = sessionStorage.getItem("selectedFilters");
    if (!savedFilters) return { campus: [], periodo: [] };

    try {
      const parsedFilters = JSON.parse(savedFilters);
      return parsedFilters.selectedFilters || { campus: [], periodo: [] };
    } catch {
      console.error("Erro ao carregar filtros do sessionStorage");
      return { campus: [], periodo: [] };
    }
  };

  const { campus: defaultCampus, periodo: defaultPeriod } =
    getFiltersFromSessionStorage();

  const [selectedCampus, setSelectedCampus] = useState<string[]>(
    defaultCampus.length > 0
      ? defaultCampus
      : ["Santo André", "São Bernardo do Campo"]
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string[]>(
    defaultPeriod.length > 0 ? defaultPeriod : ["Diurno", "Noturno"]
  );

  const isSmallScreen = window?.innerWidth < 450;

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

  const selectedKeys = new Set(selectedColumns);

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      const allColumns = visibleColumns.map((col) => col.id);
      setSelectedColumns(allColumns);
      sessionStorage.setItem("selectedColumns", JSON.stringify(allColumns));
      return;
    }

    const selectedArray = Array.from(keys);
    if (selectedArray.length === 0) {
      // Mantenha pelo menos uma coluna selecionada
      return;
    }

    const updatedColumns = selectedArray.map((key) => String(key));
    setSelectedColumns(updatedColumns);
    sessionStorage.setItem("selectedColumns", JSON.stringify(updatedColumns));
  };

  const handleCampusSelectionChange = (keys: Set<React.Key>) => {
    const selected = Array.from(keys) as string[];
    setSelectedCampus(selected);
    saveFiltersToSessionStorage({ campus: selected, periodo: selectedPeriod });
  };

  const handlePeriodSelectionChange = (keys: Set<React.Key>) => {
    const selected = Array.from(keys) as string[];
    setSelectedPeriod(selected);
    saveFiltersToSessionStorage({ campus: selectedCampus, periodo: selected });
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

      console.log(response);

      setDisciplinas(response);
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

    setDisciplinas(disciplines);

    setDisciplines(JSON.parse(disciplinesFromLocalStorage));
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  const searchFilteredDisciplines = (
    disciplines: Discipline[],
    searchTerm: string
  ) => {
    if (!searchTerm.trim()) return disciplines;

    const searchTerms = searchTerm.toLowerCase().split(/\s+/);

    return disciplines.filter((discipline) => {
      const disciplineString = JSON.stringify(discipline).toLowerCase();

      return searchTerms.every((term) => {
        // Verifica se o termo de busca está contido em qualquer parte da string da disciplina
        return disciplineString.includes(term);
      });
    });
  };

  // Acessa as disciplinas selecionadas do store
  const disciplinasSelecionadas = useDisciplinasSelecionadas();

  // Função para salvar disciplinas e atualizar a URL
  const salvarDisciplinas = (disciplina: Discipline) => {
    toggleDisciplinaSelecionada(disciplina); // Adiciona/remove a disciplina no store

    // Atualiza a URL com o novo estado
    const novasDisciplinas = disciplinasSelecionadas.some(
      (d) => d.id === disciplina.id
    )
      ? disciplinasSelecionadas.filter((d) => d.id !== disciplina.id)
      : [...disciplinasSelecionadas, disciplina];

    atualizarUrlComDisciplinas(novasDisciplinas);
  };

  const [ocultarConflitos, setOcultarConflitos] = useState(false);

  function verificarConflitoMultiplo(
    disciplina: Discipline,
    selecionadas: Discipline[]
  ): boolean {
    return selecionadas.some((selecionada) => {
      return selecionada.horarios.some((horarioSelecionado) => {
        return disciplina.horarios.some((horario) => {
          return (
            horario.semana === horarioSelecionado.semana &&
            horario.horas.some((hora) =>
              horarioSelecionado.horas.includes(hora)
            )
          );
        });
      });
    });
  }

  const filteredDisciplines = ocultarConflitos
    ? searchFilteredDisciplines(
        disciplines?.filter(
          (discipline) =>
            selectedCampus.includes(discipline.nome_campus) &&
            selectedPeriod.includes(discipline.periodo) &&
            discipline.horarios &&
            !verificarConflitoMultiplo(
              discipline,
              disciplines.filter(
                (d) => disciplinasSelecionadas.some((sel) => sel.id === d.id) // Corrigido aqui
              )
            )
        ) || [],
        searchInput
      )
    : searchFilteredDisciplines(
        disciplines?.filter(
          (discipline) =>
            selectedCampus.includes(discipline.nome_campus) &&
            discipline.horarios &&
            selectedPeriod.includes(discipline.periodo)
        ) || [],
        searchInput
      );

  // Função para atualizar a URL com as disciplinas selecionadas
  const atualizarUrlComDisciplinas = (disciplinas: Discipline[]) => {
    let newUrl = window.location.pathname;
    if (disciplinas.length > 0) {
      const disciplinasIds = disciplinas.map((d) => d.id).join(",");
      newUrl += `?disciplinas=${disciplinasIds}`;
    }
    window.history.replaceState({}, "", newUrl);
  };

  // Função para carregar disciplinas da URL apenas uma vez
  const carregarDisciplinasDaUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const disciplinasParam = urlParams.get("disciplinas");

    if (disciplinasParam && disciplines.length > 0) {
      const ids = disciplinasParam
        .split(",")
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));

      const selectedDisciplinas = disciplines.filter((d) => ids.includes(d.id));

      if (selectedDisciplinas.length > 0) {
        setDisciplinasSelecionadas(selectedDisciplinas);
      }
    }
  };

  useEffect(() => {
    if (disciplines.length > 0) {
      carregarDisciplinasDaUrl();
    }
  }, [disciplines]);

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
            selectedKeys={selectedPeriod}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              if (typeof keys === "string") return;
              handlePeriodSelectionChange(keys);
            }}
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
            selectedKeys={selectedCampus}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              if (typeof keys === "string") return;
              handleCampusSelectionChange(keys);
            }}
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
    return (
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
            selectedKeys={selectedColumns}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              if (typeof keys === "string") return;
              handleSelectionChange(keys);
            }}
            disallowEmptySelection
          >
            {visibleColumns.map((column) => (
              <DropdownItem key={column.id}>{column.value}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  };

  const saveFiltersToSessionStorage = (filters: {
    campus: string[];
    periodo: string[];
  }) => {
    const filtersData = { selectedFilters: filters };
    sessionStorage.setItem("selectedFilters", JSON.stringify(filtersData));
  };

  useEffect(() => {
    const { campus, periodo } = getFiltersFromSessionStorage();
    if (campus.length > 0) setSelectedCampus(campus);
    if (periodo.length > 0) setSelectedPeriod(periodo);
  }, []);

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
        <div className="overflow-x-auto">
          <div className="pesquisar-texto mb-8">
            <div className="flex justify-between items-center">
              <div className="flex-1 mr-4">
                <Autocomplete
                  variant="bordered"
                  defaultItems={removeDuplicatasPorChave(
                    filteredDisciplines || [],
                    "nome"
                  )}
                  placeholder="Digite o nome da disciplina"
                  className="bg-foreground-200 rounded-medium border-default-200 focus:border-[#00007c]"
                  startContent={<IoSearchOutline size={20} />}
                  value={searchInput}
                  onClear={() => {
                    setSearchInput("");
                  }}
                  onInputChange={(value) => setSearchInput(value)}
                  onSelectionChange={() => {
                    setIsAutocompleteOpen(false);
                  }}
                  classNames={{
                    base: "max-w-full",
                    listbox: "max-h-[300px]",
                    popoverContent: "w-full",
                  }}
                >
                  {(disciplina) => (
                    <AutocompleteItem
                      key={disciplina.id}
                      textValue={disciplina.nome}
                    >
                      {disciplina.nome}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>

              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    size="sm"
                    variant="solid"
                    aria-label="Selecione os Filtros"
                    className="w-[5.5em] h-[4.5em] md:w-[4.5em] rounded-medium bg-[#00007c] text-white"
                    isIconOnly
                  >
                    <IoFilterOutline size={18.5} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col space-y-4 p-2">
                    <FiltrarCampus />
                    <FiltrarPeriodo />
                    <Colunas />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center mt-4 ml-2">
              <Checkbox
                size="sm"
                className="text-sm"
                isSelected={ocultarConflitos}
                onChange={() => setOcultarConflitos(!ocultarConflitos)}
              >
                Ocultar turmas em conflito
              </Checkbox>
            </div>
          </div>

          <div className="relative overflow-y-auto h-[35em]">
            <table className="min-w-full divide-y divide-foreground-200">
              <thead>
                <tr className="bg-foreground-100 sticky top-1 z-10 shadow-lg">
                  <th></th>
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
                      disciplinasSelecionadas.some((d) => d.id === course.id)
                        ? "bg-default-300"
                        : index % 2 === 0
                          ? "bg-foreground-50"
                          : "bg-foreground-100"
                    } hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer`}
                  >
                    <td className="h-full w-[2em]">
                      <Checkbox
                        isSelected={disciplinasSelecionadas.some(
                          (d) => d.id === course.id
                        )}
                        className="ml-2"
                        onChange={() => salvarDisciplinas(course)}
                      />
                    </td>
                    {visibleColumns.map(
                      (column) =>
                        !verifySelecteds(column.id) && (
                          <td
                            key={column.id}
                            onClick={() => salvarDisciplinas(course)}
                          >
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
      )}
    </>
  );
}
