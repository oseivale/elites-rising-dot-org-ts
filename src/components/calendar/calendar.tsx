"use client";

import { useState, useEffect } from "react";
import styles from "./calendar.module.css"; // Import CSS module for styling
import { Clock } from "@/icons/clock";
import { Location } from "@/icons/location";
import { Alert } from "@/icons/alert";
import Link from "next/link";
import { format, isSameDay } from "date-fns";

interface Event {
  id: string;
  title: string;
  formattedDate: string;
  time: string;
  location: string;
  description: string;
  details: string;
}

// Assuming events are defined somewhere or imported
const events: Event[] = [
  // Example events data
  {
    id: "1",
    title: "Official Launch of Elites Rising",
    formattedDate: "2024-05-25T00:00:00-05:00",
    time: "3:30 PM",
    location: "Etobicoke Olympium Centre, Lounge A",
    description:
      "We are officially launching! Join us for free food, networking and informative panel discussion that center around raising the bar for ourselves and our community. We are pushing to foster future leaders, and to have a collective impact!",
    details: `Elites Rising is thrilled to invite you to our inaugural launch event, a day of inspiration, networking, and celebration, designed to empower and uplift black youth across the Greater Toronto Area. This dynamic event will feature an engaging panel discussion with distinguished professionals from the fields of Science, Technology, Engineering, Arts, and Mathematics (STEAM), offering valuable insights and guidance.

    Connect with peers, mentors, and industry leaders during our networking sessions, and enjoy captivating performances from local artists that reflect our vibrant community spirit. The highlight of the event will be a keynote speech from a prominent figure in the STEAM community, who will share their journey and inspire our youth to reach for greatness.
    
    We're excited to offer free food and drinks to keep the conversation flowing and the ideas growing. Whether you're a student, educator, or professional, this event promises to be an enriching experience that will motivate, educate, and connect.
    
    Details:
    
    When: [Insert Date & Time]
    Where: [Insert Venue Details]
    Admission: Free (Registration required)
    Don’t miss this fantastic opportunity to be part of a movement that's shaping the future of black excellence in Toronto and beyond. Spaces are limited, so secure your spot today!`
  },
  // Additional event objects can be added here
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<
    Event[] | null
  >(null);

  useEffect(() => {
    const currentDate = new Date();
    const eventsForToday = filterEventsByDate(events, currentDate);
    setEventsForSelectedDate(eventsForToday);
    setSelectedDate(currentDate);
  }, []);

  const filterEventsByDate = (events: Event[], date: Date): Event[] | null => {
    return events.filter((event) =>
      isSameDay(new Date(event.formattedDate), date)
    ).length > 0
      ? events.filter((event) => isSameDay(new Date(event.formattedDate), date))
      : null;
  };

  const handleDayClick = (day: Date): void => {
    setSelectedDate(day);
    const eventsForDay = filterEventsByDate(events, day);
    setEventsForSelectedDate(eventsForDay);
  };

  const generateCalendarDays = (year: number, month: number): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-start-${i}`} className={styles.emptyDay}></div>
      );
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(
        <div
          key={`day-${i}`}
          className={`${styles.day} ${
            isSameDay(date, currentDate) ? styles.currentDate : ""
          } ${
            selectedDate && isSameDay(date, selectedDate) ? styles.selected : ""
          }`}
          onClick={() => handleDayClick(date)}
        >
          {i}
        </div>
      );
    }

    // Calculate the number of empty squares at the end of the month
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const remainingEmptyDays = 7 - ((firstDayOfMonth + totalDaysInMonth) % 7);

    // Add empty squares for days after the end of the month
    for (let i = 0; i < remainingEmptyDays; i++) {
      days.push(
        <div
          key={`empty-${totalDaysInMonth + i}`}
          className={styles.emptyDay}
        />
      );
    }

    return days;
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarContentContainer}>
        <div className={styles.eventWrapper}>
          {eventsForSelectedDate && eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event) => (
              <Link
                className={styles.eventInfo}
                key={event.id}
                href={`/events/${event.title
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
              >
                <span className={styles.eventLink}>{event.title}</span>
                <span className={styles.time}>
                  <Clock />
                  <span>{event.time}</span>
                  <Location />
                  <span>{event.location}</span>
                </span>
                <span className={styles.eventDescription}>
                  {event.description}
                </span>
              </Link>
            ))
          ) : (
            <p className={styles.noEventDescription}>
              <Alert />
              No events for {format(selectedDate, "yyyy-MM-dd")}
            </p>
          )}
        </div>

        <h2 className={styles.calendarHeader}>
          {format(currentDate, "MMMM")} {currentYear}
        </h2>

        <div className={styles.daysContainer}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={styles.dayOfWeek}>
              {day}
            </div>
          ))}
          {generateCalendarDays(currentYear, currentMonth)}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
