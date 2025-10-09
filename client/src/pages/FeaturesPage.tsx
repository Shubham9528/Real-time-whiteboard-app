import { Features } from "@/components/UI/Features";
import { Testimonials } from "../components/UI/Testimonials";

export const FeaturesPage = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Seamless Collaboration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to bring your ideas to life and collaborate effectively.
          </p>
        </div>
        <Features />
        
        <div className="mt-24">
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
