import { Hero } from "@/components/UI/Hero";
import { Features } from "@/components/UI/Features";
import { LandingLayout } from "@/components/Layout/LandingLayout";

export const Landing = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
    </LandingLayout>
  );
};

export default Landing;
