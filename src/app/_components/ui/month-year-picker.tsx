"use client";

import { format, startOfMonth, endOfMonth } from "date-fns";
import type React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface MonthYearPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  initialDateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  placeholder?: string;
  buttonClassName?: string;
  align?: "center" | "start" | "end";
}

export function MonthYearPicker({
  className,
  initialDateRange,
  onDateRangeChange,
  placeholder = "Selecione o mês/ano do período",
  buttonClassName,
  align = "center",
  ...props
}: MonthYearPickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [currentView, setCurrentView] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectingMode, setSelectingMode] = useState<"from" | "to">("from");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const handleSelect = (month: number, year: number) => {
    const selectedDate = new Date(year, month);

    if (selectingMode === "from") {
      const newRange = {
        from: startOfMonth(selectedDate),
        to: date?.to,
      };
      setDate(newRange);
      setSelectingMode("to");

      if (newRange.to && newRange.from > newRange.to) {
        setDate({ from: newRange.from, to: undefined });
      }
    } else {
      if (date?.from && selectedDate >= date.from) {
        const newRange = {
          from: date.from,
          to: endOfMonth(selectedDate),
        };
        setDate(newRange);
        setSelectingMode("from");

        if (onDateRangeChange) {
          onDateRangeChange(newRange);
        }
      } else if (date?.from) {
        const newRange = {
          from: startOfMonth(selectedDate),
          to: undefined,
        };
        setDate(newRange);
        setSelectingMode("to");
      }
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentView((prev) => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      return { month: newMonth, year: newYear };
    });
  };

  const formatDateRange = () => {
    if (!date?.from) return placeholder;

    if (date.to) {
      return `${format(date.from, "MMM yyyy")} - ${format(date.to, "MMM yyyy")}`;
    }

    return format(date.from, "MMM yyyy");
  };

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild className="flex">
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-center text-left font-normal",
              !date?.from && "text-muted-foreground",
              buttonClassName,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formatDateRange()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align={align}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Select
                  value={currentView.month.toString()}
                  onValueChange={(value) =>
                    setCurrentView((prev) => ({
                      ...prev,
                      month: Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={currentView.year.toString()}
                  onValueChange={(value) =>
                    setCurrentView((prev) => ({
                      ...prev,
                      year: Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const isCurrentMonth =
                  currentView.year === new Date().getFullYear() &&
                  index === new Date().getMonth();
                const isSelected =
                  date?.from &&
                  ((date.from.getFullYear() === currentView.year &&
                    date.from.getMonth() === index) ||
                    (date.to &&
                      date.to.getFullYear() === currentView.year &&
                      date.to.getMonth() === index));

                const isInRange =
                  date?.from &&
                  date?.to &&
                  new Date(currentView.year, index) >= date.from &&
                  new Date(currentView.year, index) <= date.to;

                return (
                  <Button
                    key={`${currentView.year}-${index}`}
                    variant={
                      isSelected
                        ? "default"
                        : isInRange
                          ? "secondary"
                          : "outline"
                    }
                    className={cn(
                      "h-9",
                      isCurrentMonth &&
                        !isSelected &&
                        "border-primary text-primary",
                    )}
                    onClick={() => handleSelect(index, currentView.year)}
                  >
                    {month.substring(0, 3)}
                  </Button>
                );
              })}
            </div>

            <div className="pt-2 text-center text-sm">
              {selectingMode === "from"
                ? "Selecione o mês inicial"
                : "Selecione o mês final"}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
