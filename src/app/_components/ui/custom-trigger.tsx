"use client";
import { X } from "lucide-react";
import { useSidebar } from "./sidebar";

export const CustomTrigger = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className={className} onClick={toggleSidebar}>
      <X size={18} />
    </button>
  );
};
