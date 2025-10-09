import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Design Team Lead",
    content: "This whiteboard has transformed our remote design sprints. The real-time collaboration is seamless!",
    rating: 5
  },
  {
    name: "Sarah Kim",
    role: "Educator",
    content: "My students love using this for group projects. It's intuitive and works perfectly for virtual classrooms.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content: "The perfect tool for our agile workflow. We use it daily for sprint planning and retrospectives.",
    rating: 4
  }
];

export const Testimonials = () => {
  return (
    <div className="py-12 bg-gray-50 rounded-2xl px-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Loved by Teams Worldwide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
