"use client";
import { MonthYearPicker } from "@/app/_components/ui/month-year-picker";

export default function CreateClassgrade() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <MonthYearPicker />
      </div>
    </section>
  );
}
