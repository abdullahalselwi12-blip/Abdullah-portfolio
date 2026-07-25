'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

interface ThemeToggleContextValue {
  mounted: boolean;
}

const ThemeToggleContext = createContext<ThemeToggleContextValue | undefined>(undefined);

export function useThemeMounted() {
  const ctx = useContext(ThemeToggleContext);
  return ctx?.mounted ?? false;
}
