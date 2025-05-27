import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Producao from "./pages/Producao.jsx";

export default function App() {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow-1 overflow-auto ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producao" element={<Producao />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function getPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}