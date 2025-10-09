import { Users, Zap, Code, Lightbulb } from "lucide-react";

export const AboutPage = () => {
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "50+", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Collaboration First",
      description: "We believe in the power of working together, no matter where you are.",
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Simplicity",
      description: "Powerful tools should be intuitive and easy to use.",
    },
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the best collaboration experience.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Whiteboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering teams to collaborate visually and bring their ideas to life, no matter where they are.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white">
            <Lightbulb className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of thousands of teams who are transforming how they collaborate.
            </p>
            <a
              href="/signup"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
