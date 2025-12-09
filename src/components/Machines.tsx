import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const machines = [
  {
    name: "Escavadeiras",
    slug: "escavadeira",
    image: "/images/escavadeiras/hyundai-140.png",
  },
  {
    name: "Carregadeiras",
    slug: "carregadeira",
    image: "/images/carregadeiras/case-w20e.png",
  },
  {
    name: "Motoniveladoras",
    slug: "motoniveladora",
    image: "/images/motoniveladoras/cat-140.png",
  },
  {
    name: "Retro-escavadeiras",
    slug: "retro-escavadeira",
    image: "/images/retro-escavadeiras/case-retro.png",
  },
  {
    name: "Rolos Compactadores",
    slug: "rolo-compactador",
    image: "/images/rolos-compactadores/cat-cs533.png",
  },
  {
    name: "Tratores de Esteira",
    slug: "trator-de-esteira",
    image: "/images/tratores-esteira/cat-d6.png",
  },
  {
    name: "Tratores Agrícolas",
    slug: "trator-agricola",
    image: "/images/tratores-agricolas/massey-ferguson-4295.png",
  },
  {
    name: "Caminhões",
    slug: "caminhao",
    image: "/images/caminhoes/caminhao-prancha.png",
  },
];

function MachineCard({ machine, index }: { machine: typeof machines[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/maquinas/${machine.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-elevated transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Content Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
        {/* Image if available */}
        {machine.image && (
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-secondary/60 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Magnifier Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-yellow">
            <Search className="w-8 h-8 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Yellow Accent Line */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${
            isHovered ? "w-full" : "w-0"
          }`}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 bg-card">
        <h3 className="font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
          {machine.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Disponível para locação
        </p>
      </div>
    </motion.div>
  );
}

export function Machines() {
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
    <section id="maquinas" className="py-20 lg:py-32 bg-muted/50" ref={ref}>
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
            Nossa Frota
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            MÁQUINAS <span className="text-primary">PESADAS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Contamos com uma frota moderna e bem mantida, pronta para atender às demandas do seu projeto.
          </p>
        </motion.div>

        {/* Machines Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machines.map((machine, index) => (
            <MachineCard key={`${machine.name}-${animationKey}`} machine={machine} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
