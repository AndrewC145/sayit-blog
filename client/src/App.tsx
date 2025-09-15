import Home from "./components/Home/Home";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import About from "./components/About";
import Subscribe from "./components/Forms/Subscribe";
import CreatePost from "./components/Forms/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import Category from "./components/Posts/Category";
import PostPage from "./components/Posts/PostPage";
import Scroll from "./components/Home/Scroll";

function App() {
  return (
    <>
      <BrowserRouter>
        <Scroll>
          <AuthProvider>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route
                  path="/posts/category/:category"
                  element={<Category />}
                />
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
        </Scroll>
      </BrowserRouter>
    </>
  );
}

export default App;
