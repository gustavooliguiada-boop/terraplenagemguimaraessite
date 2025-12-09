import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const titleWords = "TERRAPLENAGEM GUIMARÃES".split(" ");

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={heroBg}
          alt="Máquinas pesadas em operação"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/90" />
      </motion.div>

      {/* Industrial Stripe Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 industrial-stripes z-10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary font-display text-sm tracking-widest uppercase">
            Desde 1995 • Belo Horizonte - MG
          </span>
        </motion.div>

        {/* Animated Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          {titleWords.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + wordIndex * 0.2,
                ease: "easeOut",
              }}
            >
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  className={`inline-block ${
                    wordIndex === 0 ? "text-secondary-foreground" : "text-primary"
                  }`}
                  whileHover={{
                    y: -5,
                    color: "hsl(var(--primary))",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-secondary-foreground/80 mb-10 max-w-3xl mx-auto font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Excelência em terraplenagem e locação de máquinas pesadas
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#maquinas">Máquinas</a>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <a href="#contato">Fale Conosco</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#sobre"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary-foreground/60 hover:text-primary transition-colors cursor-pointer z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  );
}
