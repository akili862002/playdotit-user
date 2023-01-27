import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loadable } from "./HOC/loadable";
import MainLayout from "./layouts/Main";

const HomePage = Loadable(lazy(() => import("@/pages/Home")));
const Playlist = Loadable(lazy(() => import("@/pages/Playlist")));
const Share = Loadable(lazy(() => import("@/pages/Share")));

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
