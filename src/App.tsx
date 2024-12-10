import React from "react";
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Kanbas from "./Kanbas";
import { Provider } from "react-redux";
import store from "./Kanbas/store";
import LandingPage from "./landingPage";

function App() {
  return (
    <HashRouter>
      <div>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}

export default App;
