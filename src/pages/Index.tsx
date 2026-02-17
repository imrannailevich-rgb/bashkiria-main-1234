import { useState } from "react";
import Header from "@/components/Header";
import PlaceCard from "@/components/PlaceCard";
import BookingModal from "@/components/BookingModal";
import PlaceDetailModal from "@/components/PlaceDetailModal";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

import shulganTash from "@/assets/shulgan-tash.jpg";
import abzakovo from "@/assets/abzakovo.jpg";
import yamantau from "@/assets/yamantau.jpg";
import iremel from "@/assets/iremel.jpg";
import aslykul from "@/assets/aslykul.jpg";
import muradymovo from "@/assets/muradymovo.jpg";
import krasnyKluch from "@/assets/krasny-kluch.jpg";

const places = [
  {
    name: "Шульган-Таш",
    img: shulganTash,
    desc: "Древняя пещера с наскальными рисунками возрастом более 14 000 лет.",
    fullDesc: "Шульган-Таш — уникальный природный и археологический памятник мирового значения. Пещера знаменита своими палеолитическими наскальными рисунками, которым более 14 000 лет. Здесь можно увидеть изображения мамонтов, лошадей и других животных ледниковой эпохи. Пещера также является частью заповедника, где сохраняется дикая бортевая пчела.",
  },
  {
    name: "Абзаково",
    img: abzakovo,
    desc: "Лучший горнолыжный курорт Урала с современной инфраструктурой.",
    fullDesc: "Абзаково — современный горнолыжный курорт с 15 трассами различной сложности, общей протяженностью более 18 км. Курорт работает круглый год: зимой — горные лыжи и сноуборд, летом — горный велосипед, пешие походы и отдых на природе. Развитая инфраструктура включает отели, рестораны и спа-центры.",
  },
  {
    name: "Ямантау",
    img: yamantau,
    desc: "Самая высокая и загадочная гора Южного Урала (1640 м).",
    fullDesc: "Ямантау — высочайшая вершина Южного Урала, окутанная тайнами и легендами. Название переводится с башкирского как «злая гора». Восхождение на неё — настоящее испытание для опытных туристов. С вершины открываются захватывающие виды на бескрайние уральские леса.",
  },
  {
    name: "Иремель",
    img: iremel,
    desc: "Священная гора башкир, место силы и паломничества.",
    fullDesc: "Иремель — вторая по высоте гора Южного Урала (1582 м), считающаяся священным местом у башкир. По легендам, на её вершине обитают духи. Гора привлекает тысячи туристов своими уникальными ландшафтами: каменными реками, горной тундрой и альпийскими лугами.",
  },
  {
    name: "Аслыкуль",
    img: aslykul,
    desc: "Крупнейшее озеро Башкирии с кристально чистой водой.",
    fullDesc: "Озеро Аслыкуль — самое большое озеро Башкортостана площадью более 23 км². Его название переводится как «горькое озеро» из-за слегка солоноватой воды. Озеро окружено живописными холмами и является популярным местом для отдыха, рыбалки и наблюдения за птицами.",
  },
  {
    name: "Мурадымово",
    img: muradymovo,
    desc: "Живописное ущелье с 46 пещерами и водопадами.",
    fullDesc: "Мурадымовское ущелье — природный парк с более чем 46 пещерами, многие из которых содержат следы пребывания древнего человека. Река Большой Ик прорезает известняковые скалы, создавая живописные каньоны. Парк идеален для спелеотуризма, скалолазания и пеших прогулок.",
  },
  {
    name: "Красный Ключ",
    img: krasnyKluch,
    desc: "Второй по величине карстовый источник в мире с бирюзовой водой.",
    fullDesc: "Красный Ключ — один из крупнейших карстовых источников в мире. Из-под земли выходит мощный поток кристально чистой воды бирюзового цвета. Температура воды круглый год держится около +5°C. Это уникальное природное явление, поражающее своей красотой и мощью.",
  },
];

interface Place {
  name: string;
  img: string;
  desc: string;
  fullDesc: string;
}

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="min-h-screen bg-nature-gradient relative">
      <Particles />
      <Header />

      <div className="max-w-5xl mx-auto px-5 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.slice(0, -1).map((place, index) => (
            <PlaceCard
              key={place.name}
              name={place.name}
              image={place.img}
              description={place.desc}
              delay={Math.floor(index / 2) * 150}
              onClick={() => handlePlaceClick(place)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-full md:w-1/2 md:px-0">
            <PlaceCard
              name={places[places.length - 1].name}
              image={places[places.length - 1].img}
              description={places[places.length - 1].desc}
              delay={Math.floor(places.length / 2) * 150}
              onClick={() => handlePlaceClick(places[places.length - 1])}
            />
          </div>
        </div>
      </div>

      <Footer onBookClick={() => setIsModalOpen(true)} />

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <PlaceDetailModal
        isOpen={selectedPlace !== null}
        onClose={() => setSelectedPlace(null)}
        place={selectedPlace ? {
          name: selectedPlace.name,
          image: selectedPlace.img,
          description: selectedPlace.desc,
          fullDescription: selectedPlace.fullDesc,
        } : null}
      />
    </div>
  );
};

export default Index;
