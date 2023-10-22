import "@mantine/core/styles.css";
import "./styles/index.css";

// Libraries
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Components
import { router } from "./routes/_router.tsx";
import MantineClientProvider from "./components/providers/MantineClientProvider.tsx";
import LoadSpinner from "./components/ui/animations/loading/LoadSpinner.tsx";
import { AuthProvider } from "./context/Auth.tsx";

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
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </MantineClientProvider>
  </React.StrictMode>,
);
