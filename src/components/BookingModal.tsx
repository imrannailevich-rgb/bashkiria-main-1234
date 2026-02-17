import { useState } from "react";
import { X, Check, Phone, User, Mail, Calendar, MapPin, Star, Shield, Users } from "lucide-react";
import { z } from "zod";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100, "Имя слишком длинное"),
  email: z.string().trim().email("Неверный email").max(255, "Email слишком длинный"),
  phone: z.string().trim().min(10, "Введите номер телефона").max(20, "Номер слишком длинный"),
  tourType: z.string().min(1, "Выберите тур"),
});

const tours = [
  { id: "weekend", name: "Выходные в горах", price: "12 500 ₽", duration: "2 дня" },
  { id: "week", name: "Неделя приключений", price: "45 000 ₽", duration: "7 дней" },
  { id: "premium", name: "VIP-тур", price: "89 000 ₽", duration: "10 дней" },
];

const benefits = [
  { icon: Shield, text: "Безопасность и страховка" },
  { icon: Users, text: "Опытные гиды" },
  { icon: Star, text: "Лучшие маршруты" },
  { icon: MapPin, text: "Уникальные локации" },
];

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", phone: "", tourType: "" });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div 
          className="modal-content animate-scale-in max-w-md mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">Заявка отправлена!</h2>
          <p className="text-muted-foreground mb-6">
            Мы свяжемся с вами в ближайшее время для подтверждения бронирования.
          </p>
          <button onClick={handleClose} className="btn-nature w-full">
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content animate-scale-in max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <h2 className="text-3xl md:text-4xl font-black text-title-gradient mb-6 text-center">
          ЗАБРОНИРОВАТЬ ТУР
        </h2>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-primary/10 rounded-xl p-3"
            >
              <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Tours pricing */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Выберите тур:</h3>
          <div className="space-y-2">
            {tours.map((tour) => (
              <label
                key={tour.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.tourType === tour.id
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tourType"
                    value={tour.id}
                    checked={formData.tourType === tour.id}
                    onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                    className="w-4 h-4 accent-primary"
                  />
                  <div>
                    <p className="font-bold text-foreground">{tour.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {tour.duration}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-black text-primary">{tour.price}</span>
              </label>
            ))}
          </div>
          {errors.tourType && (
            <p className="text-destructive text-sm mt-1">{errors.tourType}</p>
          )}
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <h3 className="text-lg font-bold text-foreground">Ваши данные:</h3>
          
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-muted/50 border-2 border-muted rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                maxLength={100}
              />
            </div>
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-muted/50 border-2 border-muted rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                maxLength={255}
              />
            </div>
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-muted/50 border-2 border-muted rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                maxLength={20}
              />
            </div>
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>

          <button type="submit" className="btn-shimmer w-full text-primary-foreground font-bold text-lg py-4 rounded-full">
            ОТПРАВИТЬ ЗАЯВКУ
          </button>
        </form>

        {/* Contact */}
        <div className="text-center border-t border-muted pt-4">
          <p className="text-muted-foreground mb-2">Или позвоните нам:</p>
          <a 
            href="tel:+79876543210" 
            className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="w-5 h-5" />
            +7 (987) 654-32-10
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
