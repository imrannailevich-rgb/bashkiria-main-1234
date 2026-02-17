import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Trees, Mountain, Waves } from "lucide-react";

const Header = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const getAnimationClass = () => {
    if (!isVisible) {
      return "opacity-0 translate-y-8";
    }
    return "opacity-100 translate-y-0";
  };

  return (
    <header 
      ref={elementRef}
      className={`text-center py-16 px-5 transition-all duration-700 ease-out ${getAnimationClass()}`}
    >
      <div className="relative inline-block">
        <div className="title-glow" />
        <h1 className="text-5xl md:text-7xl font-black text-title-gradient drop-shadow-lg relative">
          БАШКОРТОСТАН
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-primary mt-4 font-bold">
        Открой для себя природу!
      </p>

      {/* Минималистичные иконки природы с зацикленными анимациями */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <div 
          className="animate-pulse-glow"
          style={{ animation: "bounce-icon 1.5s ease-in-out infinite" }}
        >
          <Trees className="w-8 h-8 text-primary/90" strokeWidth={1.5} />
        </div>
        <div 
          className="animate-pulse-glow"
          style={{ animation: "bounce-icon 1.5s ease-in-out infinite 0.3s" }}
        >
          <Mountain className="w-8 h-8 text-primary/90" strokeWidth={1.5} />
        </div>
        <div 
          className="animate-pulse-glow"
          style={{ animation: "bounce-icon 1.5s ease-in-out infinite 0.6s" }}
        >
          <Waves className="w-8 h-8 text-primary/90" strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
};

export default Header;
