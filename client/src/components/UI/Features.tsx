import { PenTool, Users, Zap, Code } from "lucide-react";

const features = [
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Powerful Drawing Tools",
    description: "Draw, sketch, and annotate with a variety of tools and colors.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time, no matter where you are.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Experience smooth performance with our optimized canvas rendering.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Developer Friendly",
    description: "Built with modern web technologies for the best experience.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Amazing Features</h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Everything you need to collaborate and bring your ideas to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
