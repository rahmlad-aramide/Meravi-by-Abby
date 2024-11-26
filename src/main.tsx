import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store.ts";
import persistStore from "redux-persist/es/persistStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";  

const persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      // refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      staleTime: 60 * 1000, // 60 seconds
      gcTime: 10 * (6000 * 1000) // 10 mins for garbage collection similar to cache time
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
