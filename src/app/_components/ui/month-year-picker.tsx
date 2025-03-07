"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  isAfter,
  isSameMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type React from "react";
import { useState, useCallback, useMemo } from "react";
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
  yearsRange?: number;
  className?: string;
}

export function MonthYearPicker({
  className,
  initialDateRange,
  onDateRangeChange,
  placeholder = "Selecione o mês/ano do período",
  buttonClassName,
  align = "center",
  yearsRange = 10,
  ...props
}: MonthYearPickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [currentView, setCurrentView] = useState(() => ({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }));
  const [selectingMode, setSelectingMode] = useState<"from" | "to">("from");

  // Memoizando os meses e anos para evitar recálculos desnecessários
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      return format(new Date(2000, i), "MMMM", { locale: ptBR });
    });
  }, []);

  const monthsAbbreviated = useMemo(() => {
    return months.map((month) => month.substring(0, 3));
  }, [months]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    return Array.from(
      { length: yearsRange * 2 + 1 },
      (_, i) => currentYear - yearsRange + i,
    );
  }, [currentYear, yearsRange]);

  const handleSelect = useCallback(
    (month: number, year: number) => {
      const selectedDate = new Date(year, month);

      if (selectingMode === "from") {
        const newRange = {
          from: startOfMonth(selectedDate),
          to: undefined,
        };
        setDate(newRange);
        setSelectingMode("to");
      } else if (date?.from) {
        if (
          isAfter(selectedDate, date.from) ||
          isSameMonth(selectedDate, date.from)
        ) {
          const newRange = {
            from: date.from,
            to: endOfMonth(selectedDate),
          };
          setDate(newRange);
          setSelectingMode("from");
          onDateRangeChange?.(newRange);
        } else {
          // Se a data final é anterior à inicial, reinicia a seleção
          const newRange = {
            from: startOfMonth(selectedDate),
            to: undefined,
          };
          setDate(newRange);
          setSelectingMode("to");
        }
      }
    },
    [date?.from, onDateRangeChange, selectingMode],
  );

  const navigateMonth = useCallback((direction: number) => {
    setCurrentView((prev) => {
      const newMonth = (prev.month + direction + 12) % 12;
      let newYear = prev.year;

      if (direction === 1 && prev.month === 11) {
        newYear += 1;
      } else if (direction === -1 && prev.month === 0) {
        newYear -= 1;
      }

      return { month: newMonth, year: newYear };
    });
  }, []);

  const handleMonthChange = useCallback((value: string) => {
    setCurrentView((prev) => ({ ...prev, month: Number(value) }));
  }, []);

  const handleYearChange = useCallback((value: string) => {
    setCurrentView((prev) => ({ ...prev, year: Number(value) }));
  }, []);

  const formatDateRange = useCallback(() => {
    if (!date?.from) return placeholder;

    const fromFormatted = format(date.from, "MMM yyyy", { locale: ptBR });
    if (!date.to) return fromFormatted;

    const toFormatted = format(date.to, "MMM yyyy", { locale: ptBR });
    return `${fromFormatted} - ${toFormatted}`;
  }, [date?.from, date?.to, placeholder]);

  const isMonthSelected = useCallback(
    (month: number, year: number) => {
      if (!date?.from) return false;

      const isFromMonth =
        date.from.getFullYear() === year && date.from.getMonth() === month;

      const isToMonth =
        date.to &&
        date.to.getFullYear() === year &&
        date.to.getMonth() === month;

      return isFromMonth || isToMonth;
    },
    [date?.from, date?.to],
  );

  const isMonthInRange = useCallback(
    (month: number, year: number) => {
      if (!date?.from || !date?.to) return false;

      const monthDate = new Date(year, month);
      return (
        isAfter(
          monthDate,
          startOfMonth(new Date(date.from.getFullYear(), date.from.getMonth())),
        ) &&
        isAfter(
          endOfMonth(new Date(date.to.getFullYear(), date.to.getMonth())),
          monthDate,
        )
      );
    },
    [date?.from, date?.to],
  );

  const selectionHelpText = useMemo(() => {
    return selectingMode === "from"
      ? "Selecione o mês inicial"
      : "Selecione o mês final";
  }, [selectingMode]);

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full md:w-[300px] justify-center text-left font-normal",
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
                aria-label="Mês anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-2">
                <Select
                  value={currentView.month.toString()}
                  onValueChange={handleMonthChange}
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Mês" />
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
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Ano" />
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
                aria-label="Próximo mês"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const selected = isMonthSelected(index, currentView.year);
                const inRange = isMonthInRange(index, currentView.year);

                return (
                  <Button
                    key={`${currentView.year}-${index}`}
                    variant={
                      selected ? "default" : inRange ? "secondary" : "outline"
                    }
                    className={cn(
                      "h-9",
                      selected && "text-white border-primary bg-primary", // Texto branco quando selecionado
                    )}
                    onClick={() => handleSelect(index, currentView.year)}
                  >
                    {monthsAbbreviated[index]}
                  </Button>
                );
              })}
            </div>

            <div className="pt-2 text-center text-sm">{selectionHelpText}</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
