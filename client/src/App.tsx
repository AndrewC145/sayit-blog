import Home from "./components/Home/Home";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import About from "./components/About";
import Subscribe from "./components/Subscribe";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscribe" element={<Subscribe />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
