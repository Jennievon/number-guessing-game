import React from "react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NetworkStatus } from "./components/NetworkStatus";
import Layout from "./views/Layout";
import Home from "./views/Home";
import { ERC20Provider } from "./contexts/ERC20Context";
import { GuessProvider } from "./contexts/GuessContext";
import { WalletConnectionProvider } from "./contexts/WalletConnectionContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Guess from "./views/Guess";
const Page404 = React.lazy(() => import("./views/View404"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));

const RouterView = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <WalletConnectionProvider>
            <ERC20Provider>
              <GuessProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/guess" element={<Guess />} />
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </Layout>
              </GuessProvider>
            </ERC20Provider>
          </WalletConnectionProvider>
        </ErrorBoundary>
      </React.Suspense>
    </Router>
  );
};

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* ThemeProvider and RouterView */}
      <ThemeProvider>
        <RouterView />
      </ThemeProvider>

      {/* Always visible components */}
      <NetworkStatus />
    </SnackbarProvider>
  );
}

export default App;
