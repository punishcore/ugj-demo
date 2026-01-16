import Hero from "@/app/components/Hero";
import Stat from "@/app/components/Stat";
import JobDistribution from "@/app/components/JobDistribution";
import WaktuTungguSection from "@/app/components/WaktuTungguSection";
import FakultasSection from "@/app/components/FakultasSection";
import AlumniStatistik from "@/app/components/AlumniStatistik";
import Testimonial from "@/app/components/Testimonial";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stat />
      <JobDistribution />
      <WaktuTungguSection />
      <FakultasSection />
      <AlumniStatistik />
      <Testimonial />
      <Footer />
    </div>
  );
}
