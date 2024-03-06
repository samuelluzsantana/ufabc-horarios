'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ThemeProvider >

  )
}