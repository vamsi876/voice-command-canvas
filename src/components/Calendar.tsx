import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const events = [
    {
      id: 1,
      title: 'Computer Science Lecture',
      time: '10:00 AM - 11:30 AM',
      location: 'Room 301',
      type: 'lecture',
      date: new Date(2024, currentDate.getMonth(), 15)
    },
    {
      id: 2,
      title: 'Web Development Lab',
      time: '2:00 PM - 3:30 PM',
      location: 'Computer Lab B',
      type: 'lab',
      date: new Date(2024, currentDate.getMonth(), 15)
    },
    {
      id: 3,
      title: 'Group Project Meeting',
      time: '4:00 PM - 5:00 PM',
      location: 'Study Room 2',
      type: 'meeting',
      date: new Date(2024, currentDate.getMonth(), 20)
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (date: number) => {
    return (
      today.getDate() === date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const hasEvents = (date: number) => {
    return events.some(
      event =>
        event.date.getDate() === date &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventsForToday = () => {
    return events.filter(
      event =>
        event.date.getDate() === today.getDate() &&
        event.date.getMonth() === today.getMonth() &&
        event.date.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-white border border-gray-100" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      const hasEventToday = hasEvents(day);

      days.push(
        <div
          key={day}
          className={`aspect-square p-2 relative ${
            isCurrentDay
              ? 'bg-blue-50 text-blue-600'
              : hasEventToday
              ? 'bg-gray-50'
              : 'bg-white'
          } border border-gray-100 hover:bg-gray-50 transition-colors`}
        >
          <span className={`text-sm ${isCurrentDay ? 'font-semibold' : ''}`}>
            {day}
          </span>
          {hasEventToday && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="h-1 w-1 rounded-full bg-blue-600" />
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center py-2">
                <span className="text-sm font-medium text-gray-600">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px">
            {renderCalendarDays()}
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {getEventsForToday().map(event => (
              <div
                key={event.id}
                className="p-4 rounded-lg bg-gray-50 space-y-2"
              >
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
            {getEventsForToday().length === 0 && (
              <p className="text-sm text-gray-600">No events scheduled for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}