import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AuthInit } from "./modules/Auth";
import { Routes } from "../app/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
export default function App({ store, persistor, basename }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        <React.Suspense fallback={<LayoutSplashScreen />}>
          <BrowserRouter basename={basename}>
            <MaterialThemeProvider>
              <I18nProvider>
                <AuthInit>
                  <Routes />
                </AuthInit>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </QueryClientProvider>
  );
}
