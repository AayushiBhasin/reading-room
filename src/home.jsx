import Navbar from "./Navbar";
import BentoGrid from "./BentoGrid"
import Reportsection from "./reportsection";
import { useRef } from "react";
import GreetingCard from "./GreetingCard";
import MembersHeader from "./MembersHeader";

export default function Home(){

      const reportRef = useRef(null);

    return <>
    <Navbar scrollToReport={() => reportRef.current.scrollIntoView({ behavior: "smooth" })}  />
     {/* <GreetingCard/> */}
   <BentoGrid  />
    <MembersHeader/>
    
    <div ref={reportRef}>
      <Reportsection />
      </div>
    
    </>
}