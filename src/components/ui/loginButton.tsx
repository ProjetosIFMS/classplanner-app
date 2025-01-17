"use client";

import React from "react";
import { Button } from "./button";
import { Separator } from "./separator";
import Image from "next/image";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  const handleLogin = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <section className="flex flex-col">
      <h2 className="text-center mb-4 font-semibold">Faça seu login</h2>

      <p className="text-sm text-muted-foreground">
        Continue com seu e-mail institucional
      </p>
      <Separator className="my-3" />
      <Button variant="outline" onClick={handleLogin}>
        <Image
          aria-hidden
          src="/gmail.svg"
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
