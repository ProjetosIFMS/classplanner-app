"use client";

import React from "react";
import { Button } from "./button";
import { Separator } from "./separator";
import Image from "next/image";

export const LoginButton = () => {
  const handleLogin = async () => {
    window.location.href = process.env.NEXT_PUBLIC_API_BASE_URL + "/google";
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-center justify-self-center mb-4 font-semibold">
        Bem-vindo ao Class Planner!
      </h1>

      <p className="text-sm text-muted-foreground">
        Continue com seu e-mail institucional
      </p>
      <Separator className="my-3" />
      <Button variant="outline" onClick={handleLogin}>
        <Image
          aria-hidden
          src="/gmail.png"
          alt="Gmail icon"
          rel="icon"
          width={13}
          height={13}
        />
        Login com Gmail
      </Button>
    </section>
  );
};
