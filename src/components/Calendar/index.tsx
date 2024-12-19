"use client";
import React, { useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styles from "./calendars.module.css";

export default function Calendar() {
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]);

  return (
    <>
      <div className="mt-8">
        <div className={`${styles.calendarContainer}`}>
          <p className="mb-2">Semana A</p>
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
    </>
  );
}
