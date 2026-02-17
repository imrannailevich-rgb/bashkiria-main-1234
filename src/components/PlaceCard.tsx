import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

interface PlaceCardProps {
  name: string;
  image: string;
  description: string;
  delay: number;
  onClick: () => void;
}

const PlaceCard = ({ name, image, description, delay, onClick }: PlaceCardProps) => {
  const { elementRef, isVisible, scrollDirection } = useScrollAnimation();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (windowHeight / 2 - elementCenter) * 0.15;
        setParallaxOffset(Math.max(-30, Math.min(30, offset)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div
      ref={elementRef}
      className={`card-bashkiria transition-all duration-700 ease-out cursor-pointer ${getAnimationClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-100 ease-out scale-110"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-5 left-5 text-2xl md:text-3xl font-black text-foreground drop-shadow-lg">
          {name}
        </h3>
      </div>
      <div className="p-5 text-muted-foreground">
        {description}
      </div>
    </div>
  );
};

export default PlaceCard;
