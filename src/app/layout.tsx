"use client";

import type React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "@/components/TopBar";

const theme = createTheme({
  typography: {
    fontFamily: `"Popins", sans-serif`,
  },
  palette: {
    background: {
      default: "#F3F4F6", // Light gray for the whole page background
    },
    primary: {
      main: "hsl(0, 70%, 35.3%)", // Red for primary elements and text
    },
    secondary: {
      main: "#F9FBFD", // Gray for card headers
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
