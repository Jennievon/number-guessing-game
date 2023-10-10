import React from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NetworkStatus } from "./components/NetworkStatus";
import Home from "./views/Home";
import Layout from "./views/Layout";
import { WalletProvider } from "./contexts/WalletContext";

const _404Page = React.lazy(() => import("./views/View404"));

const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));

const RouterView = () => {
  return (
    <React.Suspense
      // fallback={<LoadingMessages messages={["Loading..."]} />}
      fallback={<div>Loading...</div>}
    >
      <ErrorBoundary>
        <WalletProvider>
          <Layout>
            <Home />
          </Layout>
        </WalletProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <ThemeProvider>
        <RouterView />
        <NetworkStatus />
        {/* </KeepAliveProvider> */}
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
