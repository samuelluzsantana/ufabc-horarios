"use client";
import React from "react";
import styles from "./calendars.module.css";
import dayjs from "dayjs";
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
}

const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8:00 to 23:00
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Calendario: React.FC<CalendarioProps> = ({ title, events }) => {
  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const startTime = dayjs(event.start);
      return startTime.day() === day + 1;
    });
  };

  const calculateEventStyle = (event: CalendarEvent) => {
    const startTime = dayjs(event.start);
    const endTime = dayjs(event.end);
    const startHour = startTime.hour() - 8; // Subtract 8 because our grid starts at 8:00
    const duration = endTime.diff(startTime, "hour");

    return {
      backgroundColor: event.color,
      top: `${startHour * 40}px`, // 40px is our min-h-[40px]
      height: `${duration * 40}px`,
      zIndex: 10,
    };
  };

  return (
    <div className="mt-8">
      <p className="mb-2 font-medium">{title}</p>
      <div className="border border-gray-200 rounded">
        <div className="grid grid-cols-7 bg-gray-50">
          <div className="p-2 border-r border-b"></div>
          {weekDays.map((day, i) => (
            <div
              key={i}
              className="p-2 text-center border-r border-b font-medium"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="relative">
          {timeSlots.map((hour) => (
            <div key={hour} className="grid grid-cols-7">
              <div className="p-2 border-r border-b text-sm">
                {`${hour}:00`}
              </div>
              {weekDays.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="border-r border-b min-h-[40px]"
                />
              ))}
            </div>
          ))}

          {/* Overlay events on top of the grid */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-7">
            <div className="col-span-1" /> {/* Time column */}
            {weekDays.map((_, dayIndex) => (
              <div key={dayIndex} className="relative">
                {getEventsForDay(dayIndex).map((event, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-0 mx-[1px] p-1 text-xs text-white overflow-hidden"
                    style={calculateEventStyle(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const shouldIncludeSchedule = (
  periodicity: string,
  isWeekA: boolean
): boolean => {
  switch (periodicity) {
    case "semanal":
      return true;
    case "quinzenal(I)":
      return isWeekA;
    case "quinzenal(II)":
      return !isWeekA;
    default:
      return false;
  }
};

const calculateEventDateTime = (dayIndex: number, time: string): string => {
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

const generateCalendarEventsFromDisciplines = (
  disciplines: Discipline[],
  isWeekA: boolean
): CalendarEvent[] => {
  return disciplines.flatMap((discipline, index) => {
    return discipline.horarios
      .filter((horario) =>
        shouldIncludeSchedule(horario.periodicidade_extenso, isWeekA)
      )
      .map((horario) => {
        const dayIndex = horario.semana;
        const startTime = horario.horas[0];
        const endTime = horario.horas[horario.horas.length - 1];

        return {
          title: `${discipline.sigla} - ${discipline.nome}`,
          start: calculateEventDateTime(dayIndex, startTime),
          end: calculateEventDateTime(dayIndex, endTime),
          color: getColorByIndex(index),
        };
      });
  });
};

export default function Calendar() {
  const disciplinasSelecionadas = useDisciplinasSelecionadas();

  const eventosA = generateCalendarEventsFromDisciplines(
    disciplinasSelecionadas,
    true
  );

  const eventosB = generateCalendarEventsFromDisciplines(
    disciplinasSelecionadas,
    false
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Calendario title="Semana A" events={eventosA} />
      <Calendario title="Semana B" events={eventosB} />
    </div>
  );
}
