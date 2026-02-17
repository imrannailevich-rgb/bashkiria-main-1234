import { X, MapPin, Camera } from "lucide-react";

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: {
    name: string;
    image: string;
    description: string;
    fullDescription?: string;
    gallery?: string[];
  } | null;
}

const PlaceDetailModal = ({ isOpen, onClose, place }: PlaceDetailModalProps) => {
  if (!isOpen || !place) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-scale-in max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6">
          <img 
            src={place.image} 
            alt={place.name}
            className="w-full h-64 object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
          <h2 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-black text-title-gradient drop-shadow-lg">
            {place.name}
          </h2>
        </div>
        
        <div className="text-left mb-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Республика Башкортостан</span>
          </div>
          <p className="text-foreground text-lg leading-relaxed">
            {place.fullDescription || place.description}
          </p>
        </div>

        {place.gallery && place.gallery.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Camera className="w-5 h-5" />
              <span className="font-bold">Галерея</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {place.gallery.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${place.name} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="btn-shimmer text-primary-foreground font-bold text-lg px-8 py-3 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center gap-2 w-full"
        >
          <X size={20} />
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default PlaceDetailModal;
