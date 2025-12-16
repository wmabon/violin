"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  bookedDates?: Date[];
  blockedDates?: Date[];
  minDate?: Date;
}

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  bookedDates = [],
  blockedDates = [],
  minDate = new Date(),
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const firstDayOfMonth = useMemo(() => {
    return startOfMonth(currentMonth).getDay();
  }, [currentMonth]);

  const isDateBooked = (date: Date) => {
    return bookedDates.some((booked) => isSameDay(booked, date));
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some((blocked) => isSameDay(blocked, date));
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return (
      isBefore(date, today) ||
      isBefore(date, minDate) ||
      isDateBooked(date) ||
      isDateBlocked(date)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousMonth}
          disabled={isSameMonth(currentMonth, new Date())}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-semibold text-stone-900">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <Button variant="ghost" size="sm" onClick={goToNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-stone-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const disabled = isDateDisabled(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const booked = isDateBooked(day);
          const today = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onDateSelect(day)}
              disabled={disabled}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
                disabled && "text-stone-300 cursor-not-allowed",
                !disabled && !selected && "hover:bg-amber-50 text-stone-700",
                selected && "bg-amber-600 text-white hover:bg-amber-700",
                today && !selected && "ring-1 ring-amber-400",
                booked && "bg-red-50 text-red-300"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-stone-100">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-600" />
            <span className="text-stone-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-50 border border-red-200" />
            <span className="text-stone-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stone-100" />
            <span className="text-stone-600">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini calendar for displaying in booking confirmation
export function MiniCalendar({ date }: { date: Date }) {
  return (
    <div className="bg-amber-50 rounded-lg p-4 text-center">
      <div className="text-amber-600 text-sm font-medium uppercase">
        {format(date, "EEEE")}
      </div>
      <div className="text-3xl font-bold text-stone-900 my-1">
        {format(date, "d")}
      </div>
      <div className="text-stone-600">{format(date, "MMMM yyyy")}</div>
    </div>
  );
}
