import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Overlays } from "@/components/Overlays";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Company from "@/pages/Company";
import Services from "@/pages/Services";
import Contacts from "@/pages/Contacts";
import LogoAnimation from "@/components/LogoAnimation";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/company" element={<Company />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/intro" element={<LogoAnimation />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </>
  );
}
