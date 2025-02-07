"use client";
import { Button, HeroUIProvider } from "@heroui/react";

import { Messages, SignUp, Inputs } from "@/components";

export default function Home() {
  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen grid place-items-center">
        <Messages />
        <Inputs />
        <SignUp />
      </div>
    </HeroUIProvider>
  );
}
