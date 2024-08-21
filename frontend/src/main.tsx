import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/fonts/font.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ThemeProvider>
        </NextUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
