import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MissionSection from '@/components/MissionSection';
import FounderSection from '@/components/FounderSection';
import SuccessStorySection from '@/components/SuccessStorySection';
import ProgramSection from '@/components/ProgramSection';
import TrainersSection from '@/components/TrainersSection';
import TeamSection from '@/components/TeamSection';
import AmbassadorsSection from '@/components/AmbassadorsSection';
import NetworkSection from '@/components/NetworkSection';
import DonationSection from '@/components/DonationSection';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal'; // Neu importieren
import ParallaxQuote from '@/components/ParallaxQuote';

export default function Home() {
  return (
    <main>
      <Navbar /> 
      
      {/* Hero braucht kein ScrollReveal, da es "Above the Fold" ist */}
      <Hero />
      
      <div id="mission">
        <ScrollReveal direction="up">
          <MissionSection />
        </ScrollReveal>
      </div>
      
      {/* Slide von links wirkt dynamisch für Story-Content */}
      <ScrollReveal direction="right" delay={200}>
        <FounderSection />
      </ScrollReveal>

      {/* Success Story - Anna-Maria Wagner */}
      <ScrollReveal mode="fade" delay={100}>
        <SuccessStorySection />
      </ScrollReveal>
      
      <div id="program">
        <ScrollReveal mode="fade">
          <ProgramSection />
        </ScrollReveal>
      </div>
      
      {/* Trainer & Team sollen sanft von unten kommen */}
      <ScrollReveal direction="up" threshold={0.1}>
        <TrainersSection />
      </ScrollReveal>
      
      <div id="team">
        <ScrollReveal mode="fade">
          <TeamSection />
        </ScrollReveal>
      </div>
      
      <div id="ambassadors">
        <AmbassadorsSection />
      </div>
      
      <ScrollReveal mode="fade">
        <NetworkSection />
      </ScrollReveal>
      
      <ParallaxQuote />

      <div id="donate">
        {/* Wichtig: Donation Section sollte nicht zu wild animiert sein, 
            damit der Fokus sofort da ist. Ein sanfter Fade ist gut. */}
        <ScrollReveal mode="fade" delay={300}>
          <DonationSection />
        </ScrollReveal>
      </div>
      
      <Footer />
    </main>
  );
}