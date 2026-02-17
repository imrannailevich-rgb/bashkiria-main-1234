import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Compass, Sparkles } from "lucide-react";

interface FooterProps {
  onBookClick: () => void;
}

const Footer = ({ onBookClick }: FooterProps) => {
  const { elementRef, isVisible, scrollDirection } = useScrollAnimation();

  const getAnimationClass = () => {
    if (!isVisible) {
      if (scrollDirection === "up") {
        return "opacity-0 translate-y-16";
      } else if (scrollDirection === "down") {
        return "opacity-0 -translate-y-16";
      }
      return "opacity-0 translate-y-16";
    }
    return "opacity-100 translate-y-0";
  };

  return (
    <footer 
      ref={elementRef}
      className={`text-center py-16 px-5 transition-all duration-700 ease-out ${getAnimationClass()}`}
    >
      <p className="text-xl md:text-2xl text-foreground mb-6 flex items-center justify-center gap-3 font-black tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>
        <Compass className="w-6 h-6 text-primary animate-pulse-glow" strokeWidth={2} />
        <span>Приключение начинается здесь!</span>
        <Sparkles className="w-6 h-6 text-secondary animate-pulse-glow" strokeWidth={2} />
      </p>
      <button onClick={onBookClick} className="btn-shimmer text-primary-foreground font-bold text-lg px-10 py-4 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl">
        ЗАБРОНИРОВАТЬ ТУР
      </button>
    </footer>
  );
};

export default Footer;
