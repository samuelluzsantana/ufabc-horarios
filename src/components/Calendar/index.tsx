"use client";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styles from "./calendars.module.css";
import dayjs from "dayjs";

import { getDisciplinasSelecionadas } from "@/services/materiasSelecionadas";
import { useDisciplinasSelecionadas } from "@/store/store";

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

const shouldIncludeHorario = (
  periodicidade: string,
  isWeekA: boolean
): boolean => {
  if (periodicidade === "semanal") return true;
  if (periodicidade === "quinzenal(I)") return isWeekA;
  if (periodicidade === "quinzenal(II)") return !isWeekA;
  return false;
};

const calculateEventTime = (dayIndex: number, time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  return dayjs()
    .startOf("week")
    .add(dayIndex, "day")
    .hour(hour)
    .minute(minute)
    .toISOString();
};

const colors = [
  "#780000",
  "#c1121f",
  "#ffb521",
  "#003049",
  "#669bbc",
  "#00007c",
];

const getColorByIndex = (index: number): string => {
  return colors[index % colors.length];
};

const generateCalendarEvents = (
  disciplinas: any[],
  isWeekA: boolean
): CalendarEvent[] => {
  return disciplinas.flatMap((disciplina, index) => {
    return disciplina.horarios
      .filter((horario: { periodicidade_extenso: string }) =>
        shouldIncludeHorario(horario.periodicidade_extenso, isWeekA)
      )
      .map((horario: { semana: number; horas: string[] }) => {
        const dayIndex = horario.semana;
        const startTime = horario.horas[0];
        const endTime = horario.horas[horario.horas.length - 1];

        return {
          title: disciplina.sigla + " " + disciplina.nome,
          start: calculateEventTime(dayIndex, startTime),
          end: calculateEventTime(dayIndex, endTime),
          color: getColorByIndex(index),
        };
      });
  });
};
export default function Calendar() {
  const disciplinasSelecionadas = useDisciplinasSelecionadas();

  const eventosA: CalendarEvent[] = generateCalendarEvents(
    disciplinasSelecionadas,
    false
  );

  const eventosB: CalendarEvent[] = generateCalendarEvents(
    disciplinasSelecionadas,
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
