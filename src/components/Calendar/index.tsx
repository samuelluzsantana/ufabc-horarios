"use client";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styles from "./calendars.module.css";

interface CalendarioProps {
  title: string;
  events: { title: string; start: string; end?: string; color?: string }[];
}

const Calendario: React.FC<CalendarioProps> = ({ title, events }) => {
  const eventos = [
    {
      title: "teste",
      start: new Date(2023, 10, 25, 8, 0).toISOString(),
      end: new Date(2023, 10, 25, 12, 0).toISOString(),
      color: "purple",
    },
    {
      title: "Evento de Segunda-feira",
      start: new Date(2023, 9, 9, 8, 0).toISOString(),
      end: new Date(2023, 9, 9, 11, 0).toISOString(),
      color: "blue",
    },
  ];

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
          events={eventos}
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

export default function Calendar() {
  const eventsA = [
    {
      title: "teste",
      start: new Date(2023, 10, 25, 8, 0).toISOString(),
      end: new Date(2023, 10, 25, 12, 0).toISOString(),
      color: "purple",
    },
    {
      title: "Evento de Segunda-feira",
      start: new Date(2023, 9, 9, 8, 0).toISOString(),
      end: new Date(2023, 9, 9, 11, 0).toISOString(),
      color: "blue",
    },
  ];

  const [eventsB, setEventsB] = useState<{ title: string; start: string }[]>(
    []
  );

  useEffect(() => {
    const disciplinesFromLocalStorage = JSON.parse(
      localStorage.getItem("disciplines")!
    );
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDisciplines =
      urlParams.get("disciplinas")?.split(/[, %2C]+/) || [];

    const selectedEventsB = disciplinesFromLocalStorage
      .filter((disciplina: any) => {
        const isSelected = selectedDisciplines.includes(
          disciplina.id.toString()
        );
        return isSelected;
      })
      .map((disciplina: any) => ({
        title: disciplina.nome,
        start: disciplina.horarios[0].horas[0],
      }));

    setEventsB(selectedEventsB);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Calendario title="Semana A" events={eventsA} />
        <Calendario title="Semana B" events={eventsB} />
      </div>
    </>
  );
}
