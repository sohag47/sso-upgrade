/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Matcher | Matcher[];
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "disabled"
  >;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  id,
  className,
  disabled = false,
  minDate,
  maxDate,
  disabledDates,
  calendarProps,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onChange?.(selectedDate);
    setOpen(false);
  };

  // Build disabled matchers for react-day-picker
  const matchers: Matcher[] = [];

  if (minDate) {
    matchers.push({ before: startOfDay(minDate) });
  }

  if (maxDate) {
    matchers.push({ after: startOfDay(maxDate) });
  }

  if (disabledDates) {
    if (Array.isArray(disabledDates)) {
      matchers.push(...disabledDates);
    } else {
      matchers.push(disabledDates);
    }
  }

  return (
    <Field className={cn("w-full", className)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "dd-MM-yyyy") : <span>{placeholder}</span>}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...(calendarProps as any)}
            mode="single"
            selected={value}
            defaultMonth={value}
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={matchers.length > 0 ? matchers : undefined}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
