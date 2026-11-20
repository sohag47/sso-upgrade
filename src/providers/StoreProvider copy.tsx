"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, type Persistor } from "redux-persist";
import { makeStore } from "@/stores/store";

function StoreLoading() {
  return (
    <div
      className="grid min-h-svh place-items-center"
      aria-busy="true"
      aria-label="Loading application"
    >
      <span className="text-sm text-muted-foreground">Loading application...</span>
    </div>
  );
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());
  const [persistor, setPersistor] = useState<Persistor | null>(null);

  useEffect(() => {
    setPersistor(persistStore(store));
  }, [store]);

  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={<StoreLoading />} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        <StoreLoading />
      )}
    </Provider>
  );
}
