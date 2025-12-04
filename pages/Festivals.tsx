import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { FESTIVALS, TRANSLATIONS } from '../constants';
import { Language, Festival } from '../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Check, UserPlus } from 'lucide-react';

interface FestivalsProps {
  language: Language;
}

const Festivals: React.FC<FestivalsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the month being viewed
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Tracks the specific day clicked
  const [eventsInMonth, setEventsInMonth] = useState<Festival[]>([]);
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({}); // Track RSVP status by Festival ID

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Vanilla JS Date Helpers
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay(); // 0 = Sunday

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  // Update events when month changes
  useEffect(() => {
    const events = FESTIVALS.filter(f => {
      const fDate = new Date(f.date);
      return fDate.getMonth() === month && fDate.getFullYear() === year;
    });
    setEventsInMonth(events);
  }, [month, year]);

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null); // Deselect when changing months
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
  };

  const getEventForDay = (day: number) => {
    return eventsInMonth.find(e => new Date(e.date).getDate() === day);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-US', { month: 'long', year: 'numeric' });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const toggleRSVP = (id: string) => {
    setRsvps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const weekDays = language === 'hi' 
    ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper to get selected event object safely
  const selectedEvent = selectedDate ? getEventForDay(selectedDate.getDate()) : null;

  // Render Calendar Grid
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-24 bg-stone-50/50" aria-hidden="true"></div>);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const event = getEventForDay(d);
      const todayClass = isToday(d) ? 'bg-saffron-50 border-saffron-300 font-bold text-saffron-700' : '';
      const selectedClass = isSelected(d) ? 'ring-2 ring-saffron-600 z-10 shadow-lg' : '';
      const eventClass = event ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-stone-50';
      const isAttending = event && rsvps[event.id];

      // Accessible Label
      const dateObj = new Date(year, month, d);
      const dateLabel = formatFullDate(dateObj);
      const ariaLabel = `${dateLabel}${isToday(d) ? ', Today' : ''}${event ? `. Event: ${event.title}` : ''}${isSelected(d) ? '. Selected' : ''}`;

      days.push(
        <button 
          key={d} 
          type="button"
          onClick={() => setSelectedDate(dateObj)}
          aria-label={ariaLabel}
          aria-current={isToday(d) ? 'date' : undefined}
          aria-pressed={isSelected(d)}
          className={`h-12 md:h-24 w-full border border-stone-100 p-1 md:p-2 cursor-pointer transition-all relative flex flex-col items-start justify-between text-left focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:z-20 ${todayClass} ${selectedClass} ${eventClass}`}
        >
          <span className={`text-sm w-6 h-6 flex items-center justify-center rounded-full ${isToday(d) ? 'bg-saffron-600 text-white' : 'text-stone-600'}`}>
            {d}
          </span>
          {event && (
            <div className="w-full mt-1">
              <div className={`hidden md:flex items-center justify-between text-xs rounded px-1 py-0.5 truncate border ${isAttending ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                <span className="truncate">{event.title}</span>
                {isAttending && <Check size={10} className="shrink-0" />}
              </div>
              <div className={`md:hidden w-2 h-2 rounded-full mx-auto ${isAttending ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <div className="bg-stone-900 py-16 text-center text-white">
        <h1 className="text-4xl font-serif font-bold">{language === 'en' ? 'Temple Calendar' : 'मंदिर पंचांग'}</h1>
        <p className="text-stone-300 mt-2">{language === 'en' ? 'Upcoming Festivals & Auspicious Dates' : 'आगामी त्यौहार और शुभ तिथियां'}</p>
      </div>

      <Section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            
            {/* Calendar Widget */}
            <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
              {/* Calendar Controls */}
              <div className="flex items-center justify-between p-6 bg-saffron-600 text-white">
                <button 
                    onClick={() => changeMonth(-1)} 
                    className="p-2 hover:bg-saffron-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous Month"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold font-serif capitalize" aria-live="polite">
                  {formatMonthYear(currentDate)}
                </h2>
                <button 
                    onClick={() => changeMonth(1)} 
                    className="p-2 hover:bg-saffron-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next Month"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center bg-stone-100 border-b border-stone-200 py-3" role="row">
                {weekDays.map((day, i) => (
                  <span key={i} className="text-stone-500 font-bold text-sm uppercase tracking-wider" role="columnheader">{day}</span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 bg-white">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Sidebar: Details / Upcoming */}
            <div className="w-full lg:w-1/3 space-y-6 sticky top-28">
              
              {/* Selected Day Info */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-saffron-500 min-h-[200px]" aria-live="polite">
                <h3 className="text-stone-400 text-sm font-bold uppercase mb-4 tracking-wider flex justify-between">
                  <span>{selectedDate ? formatShortDate(selectedDate) : 'Select a date'}</span>
                  {selectedEvent && (
                     <span className="text-red-500 flex items-center gap-1"><MapPin size={12}/> Temple Hall</span>
                  )}
                </h3>
                
                {selectedDate ? (
                  selectedEvent ? (
                    <div className="animate-fade-in">
                       <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-3">
                        Festival Day
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">
                        {selectedEvent.title}
                      </h2>
                      <p className="text-stone-600 leading-relaxed mb-6">
                        {selectedEvent.description}
                      </p>
                      
                      {/* RSVP Button */}
                      <button 
                        onClick={() => toggleRSVP(selectedEvent.id)}
                        aria-pressed={!!rsvps[selectedEvent.id]}
                        className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            rsvps[selectedEvent.id] 
                            ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 focus:ring-green-500' 
                            : 'bg-saffron-600 text-white hover:bg-saffron-700 focus:ring-saffron-500'
                        }`}
                      >
                        {rsvps[selectedEvent.id] ? (
                            <>
                                <Check size={20} />
                                <span>Attending</span>
                            </>
                        ) : (
                            <>
                                <UserPlus size={20} />
                                <span>RSVP Now</span>
                            </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-stone-400">
                        <CalendarIcon size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No major festival scheduled for this day.</p>
                        <p className="text-xs mt-2">Daily Aarti at 6:30 AM & 7:00 PM</p>
                    </div>
                  )
                ) : (
                    <div className="text-center py-8 text-stone-400">
                         <CalendarIcon size={48} className="mx-auto mb-3 opacity-20" />
                        <p>Select a date to view details.</p>
                    </div>
                )}
              </div>

              {/* Upcoming List */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <h3 className="text-stone-800 font-bold font-serif mb-4 flex items-center gap-2">
                    <CalendarIcon size={18} className="text-saffron-600" />
                    This Month
                </h3>
                <div className="space-y-3">
                    {eventsInMonth.length > 0 ? eventsInMonth.map(evt => (
                        <button 
                            key={evt.id}
                            onClick={() => {
                                setCurrentDate(new Date(evt.date)); // Ensure month is correct
                                setSelectedDate(new Date(evt.date)); // Select the date
                            }}
                            className={`w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left group ${selectedEvent?.id === evt.id ? 'ring-2 ring-saffron-400' : ''}`}
                        >
                            <div className="bg-saffron-100 text-saffron-700 rounded-lg p-2 text-center min-w-[50px]">
                                <span className="block text-xs font-bold uppercase">{new Date(evt.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="block text-xl font-bold">{new Date(evt.date).getDate()}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-stone-800 text-sm group-hover:text-saffron-700 transition-colors">{evt.title}</h4>
                                {rsvps[evt.id] && (
                                    <span className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                                        <Check size={10} /> Going
                                    </span>
                                )}
                            </div>
                        </button>
                    )) : (
                        <p className="text-stone-500 text-sm italic">No special festivals listed for this month.</p>
                    )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Festivals;