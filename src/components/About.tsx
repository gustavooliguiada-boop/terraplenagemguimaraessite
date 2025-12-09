import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Award, Users, Clock } from "lucide-react";

const stats = [
  { icon: Clock, value: "30+", label: "Anos de Experiência" },
  { icon: Users, value: "500+", label: "Projetos Realizados" },
  { icon: Award, value: "100%", label: "Comprometimento" },
  { icon: Shield, value: "Horário Comercial", label: "Atendimento" },
];

export function About() {
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
    <section id="sobre" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHYyaC0ydjRoMnYyaDR2LTJ6bTAtMTBoLTJ2LTRoMnYtMmgtNHYyaC0ydjRoMnYyaDR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            key={`content-${animationKey}`}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-sm tracking-widest uppercase mb-4">
              Sobre Nós
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              CONSTRUINDO O FUTURO{" "}
              <span className="text-primary">DESDE 1995</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Somos a <strong className="text-foreground">Terraplenagem Guimarães</strong>, atuando há 30 anos no mercado com serviços de terraplenagem, escavações e locação de máquinas pesadas.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Trabalhamos com <strong className="text-primary">profissionalismo</strong>, <strong className="text-primary">compromisso</strong> e <strong className="text-primary">segurança</strong>, entregando resultados que superam expectativas em cada projeto que realizamos.
            </p>

            <div className="flex items-center gap-4">
              <div className="h-1 w-20 bg-primary" />
              <span className="font-display text-muted-foreground tracking-wider text-sm">
                QUALIDADE GARANTIDA
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            key={`stats-grid-${animationKey}`}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              // Remove animations and hover effects for "Anos de Experiência" (index 0) and "Comprometimento" (index 2)
              const shouldAnimate = index !== 0 && index !== 2;
              
              if (shouldAnimate) {
                return (
                  <motion.div
                    key={`${stat.label}-${animationKey}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-card p-6 rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="font-display text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </motion.div>
                );
              } else {
                return (
                  <div
                    key={`${stat.label}-${animationKey}`}
                    className="bg-card p-6 rounded-lg shadow-card"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="font-display text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                );
              }
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
