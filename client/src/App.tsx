import Home from "./components/Home/Home";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import About from "./components/About";
import Subscribe from "./components/Subscribe";
import CreatePost from "./components/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import Category from "./components/Category";
import PostPage from "./components/PostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/posts/category/:category" element={<Category />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route
                path="/admin/create"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
