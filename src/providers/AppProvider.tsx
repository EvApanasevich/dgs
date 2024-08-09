"use client";
import { InteractiveProvider } from "./InteractiveProvider";
import { SessionProvider } from "next-auth/react";
import { StateProvider } from "./StateProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InteractiveProvider>
        <StateProvider>{children}</StateProvider>
      </InteractiveProvider>
    </SessionProvider>
  );
}
