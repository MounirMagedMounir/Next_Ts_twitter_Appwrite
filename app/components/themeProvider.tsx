"use client";
import { Providers } from "@/Redux/provider";
import { UseAppSelector } from "@/Redux/store";
import { PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

function themeProvider({ children }: React.PropsWithChildren) {
  
  const [mode, setMode] = useState<PaletteMode>("dark");
  const settings = UseAppSelector((state) => state.settings.value);
  const Theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    setMode(settings.theme as PaletteMode);
  }, [settings.theme]);
  return (
    <ThemeProvider theme={Theme}>
      {" "}
      <Providers>{children}</Providers>
      </ThemeProvider>
      );
}

export default themeProvider;
