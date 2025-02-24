import {Route, Routes } from "react-router";
import Home from './pages/Home';
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Cme from "./pages/Cme";
import Flr from "./pages/Flr";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound/>} />
      </Route>
      <Route path="/CME" element={<Layout/>}>
        <Route index element={<Cme />} />
        <Route path="*" element={<NotFound/>} />
      </Route>
      <Route path="/FLR" element={<Layout/>}>
        <Route index element={<Flr />} />
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  )
}

export default App
