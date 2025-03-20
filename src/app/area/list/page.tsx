"use client";
import { useAreas } from "@/hooks/useAreas";
import { AreaCards } from "../components/area-cards";
import { LoadingCard } from "@/app/_components/ui/loading-card";

export default function ListAreas() {
  const areas = useAreas();

  if (!areas) return <LoadingCard />;

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-[95rem] sm:max-w-[65rem] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
          {areas.map((data) => (
            <AreaCards key={data.id} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
}
