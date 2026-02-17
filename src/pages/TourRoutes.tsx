import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, X } from "lucide-react";

import bashkortostanMap from "@/assets/bashkortostan-map.jpg";
import shulganTash from "@/assets/shulgan-tash.jpg";
import abzakovo from "@/assets/abzakovo.jpg";
import yamantau from "@/assets/yamantau.jpg";
import iremel from "@/assets/iremel.jpg";
import aslykul from "@/assets/aslykul.jpg";
import muradymovo from "@/assets/muradymovo.jpg";
import krasnyKluch from "@/assets/krasny-kluch.jpg";

// Locations positioned based on real geographical coordinates relative to map
// Map bounds approximately: Lat 51.5-56°N, Lon 53-60°E
const locations = [
  {
    id: 1,
    name: "Шульган-Таш",
    // Real coords: 53.03°N, 57.05°E - Southeast of center
    top: "62%",
    left: "52%",
    image: shulganTash,
    description: "Древняя пещера с наскальными рисунками возрастом более 14 000 лет. Находится в 200 км к юго-востоку от Уфы в Бурзянском районе.",
  },
  {
    id: 2,
    name: "Абзаково",
    // Real coords: 53.82°N, 58.62°E - East, near Magnitogorsk
    top: "52%",
    left: "82%",
    image: abzakovo,
    description: "Лучший горнолыжный курорт Урала с 15 трассами. Расположен в 60 км от Магнитогорска.",
  },
  {
    id: 3,
    name: "Ямантау",
    // Real coords: 54.26°N, 58.10°E - East of Ufa
    top: "42%",
    left: "72%",
    image: yamantau,
    description: "Высочайшая вершина Южного Урала (1640 м). Название переводится как «злая гора».",
  },
  {
    id: 4,
    name: "Иремель",
    // Real coords: 54.52°N, 58.84°E - East, near Yamantau
    top: "38%",
    left: "78%",
    image: iremel,
    description: "Священная гора башкир высотой 1582 м. Вторая по высоте вершина Южного Урала.",
  },
  {
    id: 5,
    name: "Аслыкуль",
    // Real coords: 54.31°N, 54.58°E - West of Ufa
    top: "40%",
    left: "18%",
    image: aslykul,
    description: "Крупнейшее озеро Башкортостана площадью более 23 км². Находится в Давлекановском районе.",
  },
  {
    id: 6,
    name: "Мурадымово",
    // Real coords: 52.55°N, 57.78°E - South-southeast
    top: "72%",
    left: "62%",
    image: muradymovo,
    description: "Природный парк с 46 пещерами. Река Большой Ик создаёт живописные каньоны.",
  },
  {
    id: 7,
    name: "Красный Ключ",
    // Real coords: 55.38°N, 56.93°E - Northeast of Ufa
    top: "25%",
    left: "52%",
    image: krasnyKluch,
    description: "Второй по величине карстовый источник в мире. Температура воды круглый год +5°C.",
  },
];

interface SelectedLocation {
  id: number;
  name: string;
  image: string;
  description: string;
}

const TourRoutes = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  return (
    <div className="min-h-screen bg-nature-gradient p-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-2xl md:text-3xl font-black text-title-gradient">
            Карта маршрутов
          </h1>
        </div>

        {/* Map Container */}
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[30px] overflow-hidden border-2 border-primary/30 shadow-card">
          {/* Map Image */}
          <img
            src={bashkortostanMap}
            alt="Карта Башкортостана"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for better marker visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />

          {/* Location Markers */}
          {locations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="absolute transform -translate-x-1/2 -translate-y-full group"
              style={{ top: location.top, left: location.left }}
            >
              <div className="relative">
                <MapPin
                  className="w-8 h-8 md:w-10 md:h-10 text-primary drop-shadow-lg transition-transform duration-300 group-hover:scale-125 animate-bounce-icon"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  fill="hsl(48 96% 53% / 0.3)"
                  strokeWidth={2}
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm font-bold text-foreground bg-background/80 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  {location.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <MapPin className="w-4 h-4" />
              {location.name}
            </button>
          ))}
        </div>
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-5"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-card-glass border-2 border-primary/30 rounded-[30px] overflow-hidden max-w-lg w-full shadow-card animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-56 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/70 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="absolute bottom-4 left-5 text-2xl md:text-3xl font-black text-foreground drop-shadow-lg">
                {selectedLocation.name}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourRoutes;
