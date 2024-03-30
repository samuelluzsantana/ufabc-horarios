"use client";
// react
import React, { useEffect, useState } from "react";
// components
import FullCalendar from "@fullcalendar/react";
// calendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
// styles
import styles from "./calendars.module.css";
// utils
import dayjs from "dayjs";
// Services
import { getDisciplinasSelecionadas } from "@/services/materiasSelecionadas";

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  color?: string;
}

interface CalendarioProps {
  title: string;
  events: CalendarEvent[];
  isLoading?: boolean;
}

interface Horario {
  periodicidade_extenso: string;
  semana: number;
  horas: string[];
}

interface Disciplina {
  sigla: string;
  nome: string;
  horarios: Horario[];
}

const Calendario: React.FC<CalendarioProps> = ({ title, events }) => {
  return (
    <div className="mt-8">
      <div className={`${styles.calendarContainer}`}>
        <p className="mb-2 font-medium">{title}</p>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="timeGridWeek"
          events={events}
          locale={ptBrLocale}
          firstDay={1}
          hiddenDays={[0]}
          slotMinTime="08:00:00"
          slotMaxTime="24:00:00"
          headerToolbar={false}
          height="auto"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotDuration="01:00:00"
          allDaySlot={false}
          dayHeaderFormat={{ weekday: "short" }}
        />
      </div>
    </div>
  );
};

/**
 * Verifica se um horário deve ser incluído com base na sua periodicidade
 * @param periodicidade - Periodicidade do horário ("semanal", "quinzenal(I)" ou "quinzenal(II)")
 * @param ehSemanaA - Indica se é a semana A (true) ou B (false)
 * @returns Verdadeiro se o horário deve ser incluído, falso caso contrário
 */
const deveIncluirHorario = (
  periodicidade: string,
  ehSemanaA: boolean
): boolean => {
  if (periodicidade === "semanal") return true;
  if (periodicidade === "quinzenal(I)") return ehSemanaA;
  if (periodicidade === "quinzenal(II)") return !ehSemanaA;
  return false;
};

/**
 * Calcula o horário de uma disciplina para um determinado dia da semana
 * @param indiceDia - Índice do dia da semana (1-6, onde 1 é segunda-feira)
 * @param horario - Horário no formato "HH:mm"
 * @returns String ISO com a data e hora calculadas
 */
const calcularHorarioDisciplina = (
  indiceDia: number,
  horario: string
): string => {
  const [hora, minuto] = horario.split(":").map(Number);
  return dayjs()
    .startOf("week")
    .add(indiceDia, "day")
    .hour(hora)
    .minute(minuto)
    .toISOString();
};

/** Array de cores para as disciplinas */
const cores = [
  "#F44336", //Red
  "#9C27B0", //Purple
  "#009688", //Teal
  "#8BC34A", //Light Green
  "#607D8B", //Blue Grey
  "#FF5722", //Deep Orange
  "#4CAF50", //Green
  "#03A9F4", //Light Blue
  "#E91E63", //Pink
  "#795548", //Brown
];

/**
 * Obtém uma cor do array de cores com base no índice
 * @param indice - Índice para selecionar a cor
 * @returns Cor em formato hexadecimal
 */
const obterCorPorIndice = (indice: number): string => {
  return cores[indice % cores.length];
};

/**
 * Gera eventos do calendário a partir das disciplinas selecionadas
 * @param disciplinas - Array de disciplinas com seus horários
 * @param ehSemanaA - Indica se é a semana A (true) ou B (false)
 * @returns Array de eventos formatados para o calendário
 */
const gerarEventosCalendario = (
  disciplinas: Disciplina[],
  ehSemanaA: boolean
): CalendarEvent[] => {
  return disciplinas.flatMap((disciplina, indice) => {
    const { sigla, nome, horarios } = disciplina;
    const tituloDisciplina = `${sigla} ${nome}`;
    const corDisciplina = obterCorPorIndice(indice);

    return horarios
      .filter((horario) =>
        deveIncluirHorario(horario.periodicidade_extenso, ehSemanaA)
      )
      .map((horario) => {
        const { semana: indiceDia, horas } = horario;
        const horarioInicio = horas[0];
        const horarioFim = horas[horas.length - 1];

        return {
          title: tituloDisciplina,
          start: calcularHorarioDisciplina(indiceDia, horarioInicio),
          end: calcularHorarioDisciplina(indiceDia, horarioFim),
          color: corDisciplina,
        };
      });
  });
};

/**
 * Componente principal do calendário que exibe as semanas A e B
 * @returns Componente com dois calendários lado a lado
 */
export default function Calendar() {
  const disciplinasSelectionadas: Discipline[] = getDisciplinasSelecionadas();

  const eventosA: CalendarEvent[] = gerarEventosCalendario(
    disciplinasSelectionadas,
    false
  );

  const eventosB: CalendarEvent[] = gerarEventosCalendario(
    disciplinasSelectionadas,
    true
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Calendario title="Semana A" events={eventosA} />
        <Calendario title="Semana B" events={eventosB} />
      </div>
    </>
  );
}
