import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroBanner />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
