import React, { useState } from 'react';
import dayjs from 'dayjs';
import events from './events.json';
import './App.css';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const today = dayjs();

  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const eventsByDate = events.reduce((acc, event) => {
    const date = dayjs(event.date).format('YYYY-MM-DD');
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  return (
    <div className="container">
      <header className="header">
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>&lt;</button>
        <h1>{currentMonth.format('MMMM YYYY')}</h1>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>&gt;</button>
      </header>

      <div className="calendar">
        {[...Array(7)].map((_, i) => (
          <div className="day-name" key={i}>
            {dayjs().day(i).format('ddd')}
          </div>
        ))}
        {days.map((dayItem, i) => {
          const dateStr = dayItem.format('YYYY-MM-DD');
          const isToday = dayItem.isSame(today, 'day');
          const dayEvents = eventsByDate[dateStr] || [];

          return (
            <div
              key={i}
              className={`day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}`}
            >
              <span className="date-number">{dayItem.format('D')}</span>
              <div className="events">
                {dayEvents.map((event, idx) => (
                  <div key={idx} className="event">
                    <strong>{event.title}</strong>
                    <div>{event.time} • {event.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
