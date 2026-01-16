import Hero from "@/app/components/Hero";
import Stat from "@/app/components/Stat";
import StatusAlumni from "@/app/components/StatusAlumni";
import WaktuTunggu from "@/app/components/WaktuTunggu";
import KesesuaianPekerjaan from "@/app/components/KesesuaianPekerjaan";
import SebaranIndustri from "@/app/components/SebaranIndustri";
import RataRataGaji from "@/app/components/RataRataGaji";
import PersebaranWilayah from "@/app/components/PersebaranWilayah";
import TrenPenyerapan from "@/app/components/TrenPenyerapan";
import KepuasanAlumni from "@/app/components/KepuasanAlumni";
import FakultasProdi from "@/app/components/FakultasProdi";
import Testimonial from "@/app/components/Testimonial";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stat />
      <StatusAlumni />
      <WaktuTunggu />
      <KesesuaianPekerjaan />
      <SebaranIndustri />
      <RataRataGaji />
      <PersebaranWilayah />
      <TrenPenyerapan />
      <KepuasanAlumni />
      <FakultasProdi />
      <Testimonial />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
