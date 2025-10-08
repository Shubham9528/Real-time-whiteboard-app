import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small teams getting started.",
    features: [
      "Up to 3 active boards",
      "Basic drawing tools",
      "Real-time collaboration",
      "5MB file upload limit",
      "Community support"
    ],
    buttonText: "Get Started",
    featured: false
  },
  {
    name: "Pro",
    price: "$9",
    description: "For professionals and growing teams who need more power.",
    features: [
      "Unlimited boards",
      "Advanced drawing tools",
      "Unlimited collaborators",
      "1GB file upload limit",
      "Export to PDF/PNG",
      "Version history (7 days)",
      "Priority support"
    ],
    buttonText: "Start Free Trial",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced security and admin needs.",
    features: [
      "Everything in Pro",
      "Unlimited version history",
      "Single Sign-On (SSO)",
      "Advanced security controls",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & 24/7 support"
    ],
    buttonText: "Contact Sales",
    featured: false
  }
];

export const PricingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your team's needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
            <button className="px-6 py-2 rounded-md font-medium text-gray-700">Monthly</button>
            <button className="px-6 py-2 bg-white rounded-md shadow-sm font-medium text-gray-900">
              Yearly <span className="text-sm text-blue-600 ml-1">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                plan.featured ? 'ring-2 ring-blue-500 transform md:-translate-y-4' : ''
              }`}
            >
              {plan.featured && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1 text-gray-500">/user/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium ${
                    plan.featured 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
              },
              {
                question: "How does the free plan work?",
                answer: "The free plan includes basic features and is great for trying out the platform."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards and PayPal. For enterprise plans, we also support bank transfers."
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
