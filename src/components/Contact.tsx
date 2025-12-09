import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefones",
    values: ["(31) 3495-9108", "(31) 98658-3920"],
    href: "tel:+553134959108",
  },
  {
    icon: Mail,
    label: "E-mail",
    values: ["contato@terraplenagemguimaraes.com.br"],
    href: "mailto:contato@terraplenagemguimaraes.com.br",
  },
];

const addresses = [
  {
    icon: MapPin,
    label: "Belo Horizonte",
    value: "Rua Vinte e Dois, 22 – São Gabriel – Belo Horizonte / MG",
    coordinates: "Rua Vinte e Dois, 22, São Gabriel, Belo Horizonte, MG",
  },
  {
    icon: MapPin,
    label: "Santa Luzia",
    value: "Rua Santa Luzia, 307 – Centro – Santa Luzia / MG",
    coordinates: "Rua Santa Luzia, 307, Centro, Santa Luzia, MG",
  },
  {
    icon: MapPin,
    label: "Beija Flor",
    value: "Rua dos Moreiras, 5 – Beija Flor – Belo Horizonte / MG",
    coordinates: "Rua dos Moreiras, 5, Beija Flor, Belo Horizonte, MG",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { toast } = useToast();
  const [animationKey, setAnimationKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Reset animation when coming back into view
  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contato" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          key={`header-${animationKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase mb-4">
            Contato
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            FALE <span className="text-primary">CONOSCO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entre em contato para solicitar um orçamento ou tirar dúvidas sobre nossos serviços.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            key={`form-${animationKey}`}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-wider">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all duration-300"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-wider">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all duration-300"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block font-display text-sm text-foreground mb-2 uppercase tracking-wider">
                  Mensagem
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground resize-none transition-all duration-300"
                  placeholder="Descreva seu projeto ou dúvida..."
                />
              </div>
              <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            key={`info-${animationKey}`}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Phone & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="group flex items-start gap-4 p-6 bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-display text-sm text-muted-foreground uppercase tracking-wider">
                      {info.label}
                    </span>
                    {info.values.map((value) => (
                      <p key={value} className="font-display font-bold text-foreground break-all">
                        {value}
                      </p>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Addresses */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-wider">
                Nossos Endereços
              </h3>
              {addresses.map((address) => {
                // Belo Horizonte address should not open maps
                const isBeloHorizonte = address.label === "Belo Horizonte";
                
                if (isBeloHorizonte) {
                  return (
                    <div
                      key={address.label}
                      className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <address.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-display text-sm text-primary font-semibold">
                          {address.label}
                        </span>
                        <p className="text-muted-foreground text-sm mt-1">
                          {address.value}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <a
                    key={address.label}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.coordinates)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-muted rounded-lg hover:bg-muted/70 transition-all duration-300 cursor-pointer hover:shadow-md"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <address.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="font-display text-sm text-primary font-semibold group-hover:text-primary/80 transition-colors">
                        {address.label}
                      </span>
                      <p className="text-muted-foreground text-sm mt-1 group-hover:text-foreground transition-colors">
                        {address.value}
                      </p>
                      <span className="text-xs text-primary/60 mt-1 block">
                        Clique para abrir no mapa
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
