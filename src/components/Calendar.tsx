import React, { useState, useEffect } from 'react';
import { CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Plus, Edit, Trash2, X } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  type: 'lecture' | 'lab' | 'meeting' | 'assignment' | 'exam';
  date: Date;
  description?: string;
  course?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  event?: Event;
  selectedDate?: Date;
}

function EventModal({ isOpen, onClose, onSave, event, selectedDate }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    location: '',
    type: 'lecture' as Event['type'],
    description: '',
    course: '',
    date: selectedDate || new Date()
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        time: event.time,
        location: event.location,
        type: event.type,
        description: event.description || '',
        course: event.course || '',
        date: event.date
      });
    } else if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      title: '',
      time: '',
      location: '',
      type: 'lecture',
      description: '',
      course: '',
      date: selectedDate || new Date()
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {event ? 'Edit Event' : 'Add New Event'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10:00 AM - 11:30 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="lecture">Lecture</option>
                <option value="lab">Lab</option>
                <option value="meeting">Meeting</option>
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Room 301, Online, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course (Optional)
            </label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Computer Science 101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Additional details about the event"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {event ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Computer Science Lecture',
      time: '10:00 AM - 11:30 AM',
      location: 'Room 301',
      type: 'lecture',
      course: 'CS 101',
      date: new Date(2024, 11, 15),
      description: 'Introduction to algorithms and data structures'
    },
    {
      id: 2,
      title: 'Web Development Lab',
      time: '2:00 PM - 3:30 PM',
      location: 'Computer Lab B',
      type: 'lab',
      course: 'Web Dev 201',
      date: new Date(2024, 11, 15),
      description: 'Hands-on practice with React components'
    },
    {
      id: 3,
      title: 'Group Project Meeting',
      time: '4:00 PM - 5:00 PM',
      location: 'Study Room 2',
      type: 'meeting',
      course: 'Business Ethics',
      date: new Date(2024, 11, 20),
      description: 'Final presentation preparation'
    },
    {
      id: 4,
      title: 'Midterm Exam',
      time: '9:00 AM - 11:00 AM',
      location: 'Main Hall',
      type: 'exam',
      course: 'Mathematics 101',
      date: new Date(2024, 11, 22),
      description: 'Covers chapters 1-8'
    }
  ]);

  const today = new Date();

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

  const getEventsForDate = (date: number) => {
    return events.filter(
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

  const handleDateClick = (date: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    setSelectedDate(clickedDate);
  };

  const handleAddEvent = () => {
    setEditingEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : event
      ));
    } else {
      const newEvent: Event = {
        ...eventData,
        id: Math.max(...events.map(e => e.id), 0) + 1
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assignment':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
      const dayEvents = getEventsForDate(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-2 relative cursor-pointer transition-colors ${
            isCurrentDay
              ? 'bg-blue-50 text-blue-600 border-blue-200'
              : dayEvents.length > 0
              ? 'bg-gray-50 hover:bg-gray-100'
              : 'bg-white hover:bg-gray-50'
          } border border-gray-100`}
        >
          <span className={`text-sm ${isCurrentDay ? 'font-semibold' : ''}`}>
            {day}
          </span>
          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 left-1 right-1">
              <div className="flex flex-wrap gap-1">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 rounded-full bg-blue-600"
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <button
          onClick={handleAddEvent}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {getEventsForToday().map(event => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border space-y-2 ${getEventTypeColor(event.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  {event.course && (
                    <div className="text-sm font-medium">
                      {event.course}
                    </div>
                  )}
                </div>
              ))}
              {getEventsForToday().length === 0 && (
                <p className="text-sm text-gray-600">No events scheduled for today</p>
              )}
            </div>
          </div>

          {selectedDate && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <div className="space-y-4">
                {getEventsForDate(selectedDate.getDate()).map(event => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border space-y-2 ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.course && (
                      <div className="text-sm font-medium">
                        {event.course}
                      </div>
                    )}
                    {event.description && (
                      <p className="text-sm opacity-90">{event.description}</p>
                    )}
                  </div>
                ))}
                {getEventsForDate(selectedDate.getDate()).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-600 mb-4">No events on this date</p>
                    <button
                      onClick={() => {
                        setSelectedDate(selectedDate);
                        handleAddEvent();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}