import { Footer } from "./components/Footer";
import { MainContent } from "./components/MainContent";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <div className="h-screen flex flex-col items-center justify-center">
          <h3 className="text-4xl font-medium text-center">Welcome to</h3>
          <h1 className="text-7xl font-bold my-5">
            <span className="text-primary">GLA</span> Codify
          </h1>
        </div>
        <MainContent />
      </div>
      <Footer />
    </>
  );
}
