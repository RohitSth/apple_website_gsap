import Hero from "./Hero";
import Highlights from "./Highlights";
import Navbar from "./Navbar";
import Model from "./Model";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default HomePage;
