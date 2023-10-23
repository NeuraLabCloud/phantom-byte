import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./styles/index.css";

// Libraries
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Notifications } from "@mantine/notifications";

// Components
import { router } from "./routes/_router.tsx";
import MantineClientProvider from "./components/providers/MantineClientProvider.tsx";
import LoadSpinner from "./components/ui/animations/loading/LoadSpinner.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function fallbackRender({ error, resetErrorBoundary }: any) {
  resetErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineClientProvider>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <AuthProvider>
          <Suspense fallback={<LoadSpinner />}>
            <Notifications limit={3} autoClose={5000} />
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </MantineClientProvider>
  </React.StrictMode>,
);
