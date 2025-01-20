"use client";

import React from "react";
import { LoginButton } from "./_components/ui/loginButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="relative w-80 h-80">
        <Image
          aria-hidden
          src="/logo.png"
          alt="Class Planner icon"
          rel="icon"
          className="object-contain mb-5"
          fill
        />
      </div>
      <LoginButton />
    </div>
  );
}
