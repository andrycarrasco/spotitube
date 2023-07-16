import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/error/index.tsx";
import { Home } from "./views/home/index.tsx";
import "./styles.scss";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Migrator } from "./views/migrator/index.tsx";
import { AppRealContext } from "./context/index.ts";
import { Auth } from "./views/auth/index.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#201e38",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/migrator",
    element: <Migrator />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_YOUTUBE_CLIENT_ID}>
      <AppRealContext>
        <RouterProvider router={router} />
      </AppRealContext>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
