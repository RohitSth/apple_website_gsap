import Hero from "./Hero";
import Highlights from "./Highlights";
import Navbar from "./Navbar";
import Model from "./Model";

export default function HomePage() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
}
