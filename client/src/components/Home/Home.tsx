import Header from "./Header";
import Hero from "./Hero";
import Articles from "./Articles";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Articles />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default Home;
