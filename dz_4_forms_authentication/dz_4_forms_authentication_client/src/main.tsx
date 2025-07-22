import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "@/app/AppRouter";
import { Provider } from "react-redux";
import { store } from "@/app/store";

import "@/shared/styles/global.module.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
);
