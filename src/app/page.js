import Hero from "@/componenets/Hero";
import Services from "@/componenets/Services";
import CaseStudies from "@/componenets/CaseStudies";
import Process from "@/componenets/Process";
import Testimonials from "@/componenets/Testimonials";
import Contact from "@/componenets/Contact";

import CapabilitiesStrip from "@/componenets/CapabilitiesStrip";
import Faq from "@/componenets/Faq";
import Navbar from "@/componenets/global/Navbar";


export default function Home() {
  return (
  <>
   

      <Hero />
      <Services />
           <CaseStudies />
             <Process />
                <Testimonials />
                <Faq />
             
                 <Contact />
                 
      {/* other sections will come here */}
    </>
  );
}
