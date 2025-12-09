import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Mountain, Shovel, Truck, HardHat } from "lucide-react";

const services = [
  {
    icon: Mountain,
    title: "Aterro / Desaterro",
    description: "Serviços completos de movimentação de terra para preparação de terrenos.",
  },
  {
    icon: Shovel,
    title: "Terraplenagem em Geral",
    description: "Nivelamento, corte e aterro para obras residenciais, comerciais e industriais.",
  },
  {
    icon: Truck,
    title: "Locação de Máquinas",
    description: "Aluguel de diversos equipamentos pesados.",
  },
  {
    icon: HardHat,
    title: "Escavações",
    description: "Escavações de fundações, valas, piscinas e demais estruturas.",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when coming back into view
  useEffect(() => {
    if (isInView) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isInView]);

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-2 industrial-stripes" />
      <div className="absolute bottom-0 left-0 w-full h-2 industrial-stripes" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          key={`header-${animationKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-display text-sm tracking-widest uppercase mb-4">
            O Que Fazemos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
            NOSSOS <span className="text-primary">SERVIÇOS</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
            Oferecemos soluções completas em terraplenagem e movimentação de terra para projetos de todos os portes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={`${service.title}-${animationKey}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-lg p-6 hover:bg-primary transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-foreground/20 transition-colors duration-500">
                <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-secondary-foreground group-hover:text-primary-foreground transition-colors duration-500 mb-3">
                {service.title}
              </h3>
              <p className="text-secondary-foreground/70 group-hover:text-primary-foreground/80 transition-colors duration-500">
                {service.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 bg-primary group-hover:bg-primary-foreground w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
