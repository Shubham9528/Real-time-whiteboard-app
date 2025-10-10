import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const handleNavigation = (path: string) => {
    if (!user) {
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
  };
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Collaborate in Real-Time
            </h1>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl">
              Draw, sketch, and brainstorm together with our interactive whiteboard. Perfect for teams, classrooms, and creative minds.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => handleNavigation('/create')} 
                size="lg"
                className="w-full sm:w-auto"
              >
                Create Board
              </Button>
              <Button 
                onClick={() => handleNavigation('/join')}
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Join Board
              </Button>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                {/* Whiteboard mockup */}
                <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden">
                  {/* Drawing elements */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-70"></div>
                  <div className="absolute top-8 right-8 w-20 h-12 bg-purple-200 rounded-lg opacity-70"></div>
                  <div className="absolute bottom-6 left-8 w-24 h-2 bg-green-300 rounded-full opacity-70"></div>
                  <div className="absolute bottom-12 right-6 w-12 h-12 bg-yellow-200 rounded-lg opacity-70"></div>
                  
                  {/* Curved line */}
                  <svg className="absolute top-16 left-12 w-32 h-20" viewBox="0 0 128 80">
                    <path 
                      d="M10,40 Q40,10 70,40 T120,40" 
                      stroke="#8B5CF6" 
                      strokeWidth="3" 
                      fill="none" 
                      opacity="0.7"
                    />
                  </svg>
                </div>
                
                {/* Toolbar mockup */}
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-red-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
                </div>
              </div>
              
              {/* Floating collaboration indicators */}
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
