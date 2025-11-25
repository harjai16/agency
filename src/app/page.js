import Hero from "@/componenets/Hero";
import Services from "@/componenets/Services";
import CaseStudies from "@/componenets/CaseStudies";
import Process from "@/componenets/Process";
import Testimonials from "@/componenets/Testimonials";
import Contact from "@/componenets/Contact";


import Faq from "@/componenets/Faq";
import Navbar from "@/componenets/global/Navbar";
import LogosStrip from "@/componenets/LogosStrip";


export default function Home() {
  return (
  <>
   

      <Hero />
      <Services />
           <LogosStrip/>
           <CaseStudies />
      
             <Process />
                <Testimonials />
                <Faq />
             
                 <Contact />
                 
      {/* other sections will come here */}
    </>
  );
}
