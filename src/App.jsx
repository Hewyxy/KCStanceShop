import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import About from "./pages/About";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
